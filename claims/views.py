from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Claim
from .serializers import ClaimSerializer

class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(claimant=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Claim.objects.all()
        return Claim.objects.filter(claimant=user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        claim = self.get_object()
        claim.status = 'APPROVED'
        claim.admin_notes = request.data.get('notes', '')
        claim.save()
        return Response({'status': 'Claim approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        claim = self.get_object()
        claim.status = 'REJECTED'
        claim.admin_notes = request.data.get('notes', '')
        claim.save()
        return Response({'status': 'Claim rejected'})