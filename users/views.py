from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from .serializers import UserSerializer, RegisterSerializer
from .email_verification import send_verification_email, send_password_reset_email
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(generics.CreateAPIView):
    """User registration endpoint"""
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Auto-verify @vignan.ac.in emails
            email = user.email.lower()
            if '@vignan.ac.in' in email:
                user.profile.is_email_verified = True
                user.profile.save()
            else:
                # Send verification email for non-university emails
                try:
                    send_verification_email(user)
                except Exception as e:
                    pass  # Email sending is best-effort
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'email_verified': user.profile.is_email_verified,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class VerifyEmailView(APIView):
    """Verify email with token"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({'error': 'Token required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            profile = User.objects.get(profile__verification_token=token).profile
            profile.is_email_verified = True
            profile.verification_token = None
            profile.save()
            return Response({'status': 'Email verified successfully'})
        except User.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class RequestPasswordResetView(APIView):
    """Request password reset OTP"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            otp = send_password_reset_email(user)
            return Response({
                'status': 'OTP sent to email',
                'otp': otp if not settings.PRODUCTION else None  # Return OTP in dev only
            })
        except User.DoesNotExist:
            return Response({'error': 'No account with this email'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    """Reset password with OTP"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')
        
        if not all([email, otp, new_password]):
            return Response({'error': 'email, otp, and new_password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            if user.profile.verification_token != otp:
                return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(new_password)
            user.save()
            user.profile.verification_token = None
            user.profile.save()
            
            return Response({'status': 'Password reset successfully'})
        except User.DoesNotExist:
            return Response({'error': 'No account with this email'}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    """Change password for authenticated user"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not all([old_password, new_password]):
            return Response({'error': 'old_password and new_password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        if not user.check_password(old_password):
            return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        return Response({'status': 'Password changed successfully'})

class LoginHistoryView(APIView):
    """View login history"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        # Login history from JWT tokens
        from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
        tokens = OutstandingToken.objects.filter(user=request.user).order_by('-created_at')[:20]
        
        history = []
        for token in tokens:
            history.append({
                'created_at': token.created_at,
                'expires_at': token.expires_at,
                'ip_address': token.jti,  # Can be enriched with IP tracking
            })
        
        return Response(history)

class DeleteAccountView(APIView):
    """Delete user account"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Password required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        if not user.check_password(password):
            return Response({'error': 'Password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.is_active = False
        user.save()
        return Response({'status': 'Account deleted successfully'})