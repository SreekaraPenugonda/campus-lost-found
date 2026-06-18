from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from items.models import Item
from .models import MatchResult
from .serializers import MatchResultSerializer

class MatchResultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MatchResult.objects.all()
    serializer_class = MatchResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MatchResult.objects.filter(
            Q(lost_item__reported_by=user) | Q(found_item__reported_by=user)
        )

    @action(detail=False, methods=['post'])
    def run_matching(self, request):
        """Run matching algorithm between lost and found items"""
        MatchResult.objects.all().delete()
        
        lost_items = Item.objects.filter(status='LOST', is_active=True)
        found_items = Item.objects.filter(status='FOUND', is_active=True)
        
        matches_created = 0
        for lost in lost_items:
            for found in found_items:
                score = 0
                
                # Category match (highest weight)
                if lost.category == found.category:
                    score += 40
                
                # Building match
                if lost.building.lower() == found.building.lower():
                    score += 25
                
                # Brand match
                if lost.brand and found.brand and lost.brand.lower() == found.brand.lower():
                    score += 15
                
                # Color match
                if lost.color and found.color and lost.color.lower() == found.color.lower():
                    score += 10
                
                # Keyword overlap in title/description
                lost_keywords = set((lost.title + " " + lost.description).lower().split())
                found_keywords = set((found.title + " " + found.description).lower().split())
                common_keywords = lost_keywords & found_keywords
                score += min(len(common_keywords), 10)
                
                # Only create match if score is significant
                if score >= 40:
                    MatchResult.objects.create(
                        lost_item=lost,
                        found_item=found,
                        score=min(score, 100)
                    )
                    matches_created += 1
        
        return Response({
            'matches_created': matches_created,
            'message': f'Found {matches_created} potential matches'
        })