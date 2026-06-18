import random
import string
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile

def generate_verification_token():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))

def send_verification_email(user):
    """Send email verification link to user"""
    profile = user.profile
    token = generate_verification_token()
    profile.verification_token = token
    profile.save()
    
    # In production, use a proper frontend URL
    verification_url = f"http://127.0.0.1:8000/api/verify-email/?token={token}"
    
    send_mail(
        subject='Verify your Vignan University Lost & Found account',
        message=f'''
        Hi {user.first_name or user.username},
        
        Please verify your email address by clicking the link below:
        {verification_url}
        
        If you didn't create this account, please ignore this email.
        
        - Vignan University Lost & Found Team
        ''',
        from_email='noreply@vignan.ac.in',
        recipient_list=[user.email],
        fail_silently=True,
    )

def send_password_reset_email(user):
    """Send password reset OTP"""
    import random
    otp = ''.join(random.choices(string.digits, k=6))
    profile = user.profile
    profile.verification_token = otp  # Reuse token field for OTP
    profile.save()
    
    send_mail(
        subject='Password Reset OTP - Vignan Lost & Found',
        message=f'''
        Hi {user.first_name or user.username},
        
        Your password reset OTP is: {otp}
        
        This OTP will expire in 10 minutes.
        
        - Vignan University Lost & Found Team
        ''',
        from_email='noreply@vignan.ac.in',
        recipient_list=[user.email],
        fail_silently=True,
    )
    return otp