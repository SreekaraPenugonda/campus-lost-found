from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
from difflib import SequenceMatcher
from items.models import Item
from .models import MatchResult
from .serializers import MatchResultSerializer

class MatchResultViewSet(viewsets.ReadOnlyModelViewSet):
    """Automatic matching engine for lost and found items"""
    queryset = MatchResult.objects.filter(is_active=True)
    serializer_class = MatchResultSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['post'])
    def find_matches(self, request):
        """Find matches for a specific item"""
        item_id = request.data.get('item_id')
        if not item_id:
            return Response({'error': 'item_id required'}, status=400)
        
        try:
            item = Item.objects.get(id=item_id, is_active=True)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
        
        matches = []
        
        if item.status == 'LOST':
            # Search found items
            candidates = Item.objects.filter(
                status='FOUND',
                category=item.category,
                is_active=True
            ).exclude(id=item.id)
            
            for candidate in candidates:
                score = self.calculate_match_score(item, candidate)
                if score > 50:
                    matches.append({
                        'item': candidate,
                        'score': score
                    })
        
        elif item.status == 'FOUND':
            # Search lost items
            candidates = Item.objects.filter(
                status='LOST',
                category=item.category,
                is_active=True
            ).exclude(id=item.id)
            
            for candidate in candidates:
                score = self.calculate_match_score(candidate, item)
                if score > 50:
                    matches.append({
                        'item': candidate,
                        'score': score
                    })
        
        # Sort by score
        matches.sort(key=lambda x: x['score'], reverse=True)
        
        # Create MatchResult objects
        created_matches = []
        for match in matches[:10]:  # Top 10 matches
            match_result, created = MatchResult.objects.get_or_create(
                lost_item=item if item.status == 'LOST' else match['item'],
                found_item=item if item.status == 'FOUND' else match['item'],
                defaults={
                    'match_score': match['score'],
                    'is_active': True
                }
            )
            if created:
                created_matches.append(match_result)
        
        serializer = MatchResultSerializer(created_matches, many=True)
        return Response({
            'total_matches': len(matches),
            'matches': serializer.data
        })

    def calculate_match_score(self, lost, found):
        """Calculate match score between lost and found items (0-100)"""
        score = 0
        
        # Category match (20 points)
        if lost.category == found.category:
            score += 20
        
        # Building match (15 points)
        if lost.building and found.building:
            if lost.building.lower() == found.building.lower():
                score += 15
        
        # Color match (15 points)
        if lost.color and found.color:
            if lost.color.lower() == found.color.lower():
                score += 15
        
        # Brand match (20 points)
        if lost.brand and found.brand:
            if lost.brand.lower() == found.brand.lower():
                score += 20
        
        # Text similarity (30 points)
        if lost.description and found.description:
            similarity = SequenceMatcher(
                None,
                lost.description.lower(),
                found.description.lower()
            ).ratio()
            score += similarity * 30
        
        return min(score, 100)  # Cap at 100

    @action(detail=False, methods=['get'])
    def my_matches(self, request):
        """Get matches for current user's items"""
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=401)
        
        user_items = Item.objects.filter(reported_by=request.user, is_active=True)
        matches = MatchResult.objects.filter(
            Q(lost_item__in=user_items) | Q(found_item__in=user_items),
            is_active=True
        ).order_by('-match_score')[:20]
        
        serializer = MatchResultSerializer(matches, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def mark_contacted(self, request, pk=None):
        """Mark match as contacted"""
        match = self.get_object()
        match.is_contacted = True
        match.save()
        return Response({'status': 'Marked as contacted'})