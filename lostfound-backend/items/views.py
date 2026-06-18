from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q, Count
from django.utils import timezone
from .models import Item, SuccessStory, Feedback
from .serializers import ItemSerializer, ItemListSerializer, SuccessStorySerializer, FeedbackSerializer
import uuid

class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed or edited.
    """
    queryset = Item.objects.filter(is_active=True)
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'category', 'building', 'brand', 'color']
    ordering_fields = ['date_reported', 'views_count', 'urgency']
    ordering = ['-date_reported']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ItemListSerializer
        return ItemSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by user
        user_param = self.request.query_params.get('user')
        if user_param and self.request.user.is_authenticated:
            if user_param == 'me':
                queryset = queryset.filter(reported_by=self.request.user)
        
        # Filter by status
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param.upper())
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category.upper())
        
        # Filter by building
        building = self.request.query_params.get('building')
        if building:
            queryset = queryset.filter(building__icontains=building)
        
        # Filter by urgency
        urgency = self.request.query_params.get('urgency')
        if urgency:
            queryset = queryset.filter(urgency=urgency.upper())
        
        # Filter by time range
        time_range = self.request.query_params.get('time')
        if time_range:
            now = timezone.now()
            if time_range == 'hour':
                queryset = queryset.filter(date_reported__gte=now - timezone.timedelta(hours=1))
            elif time_range == 'day':
                queryset = queryset.filter(date_reported__gte=now - timezone.timedelta(days=1))
            elif time_range == 'week':
                queryset = queryset.filter(date_reported__gte=now - timezone.timedelta(weeks=1))
            elif time_range == 'month':
                queryset = queryset.filter(date_reported__gte=now - timezone.timedelta(days=30))
        
        # Search in title and description
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search) |
                Q(brand__icontains=search) |
                Q(color__icontains=search)
            )
        
        return queryset
    
    def perform_create(self, serializer):
        qr_code = str(uuid.uuid4())[:8].upper()
        if self.request.user.is_authenticated:
            serializer.save(reported_by=self.request.user, qr_code=qr_code)
        else:
            from django.contrib.auth.models import User
            default_user, _ = User.objects.get_or_create(
                username='anonymous',
                defaults={'email': 'anonymous@campus.edu'}
            )
            serializer.save(reported_by=default_user, qr_code=qr_code)
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        item = self.get_object()
        item.views_count += 1
        item.save()
        return Response({'views_count': item.views_count})
    
    @action(detail=True, methods=['post'])
    def mark_resolved(self, request, pk=None):
        item = self.get_object()
        item.status = 'RESOLVED'
        item.date_resolved = timezone.now()
        item.save()
        return Response({'status': 'Item marked as resolved'})
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        total = Item.objects.count()
        lost = Item.objects.filter(status='LOST').count()
        found = Item.objects.filter(status='FOUND').count()
        resolved = Item.objects.filter(status='RESOLVED').count()
        
        # Category breakdown
        categories = Item.objects.values('category').annotate(count=Count('id'))
        
        # Building hotspots
        hotspots = Item.objects.values('building').annotate(count=Count('id')).order_by('-count')[:10]
        
        return Response({
            'total': total,
            'lost': lost,
            'found': found,
            'resolved': resolved,
            'categories': categories,
            'hotspots': hotspots,
        })
    
    @action(detail=False, methods=['get'])
    def analytics(self, request):
        """Personal analytics for authenticated user"""
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=401)
        
        user_items = Item.objects.filter(reported_by=request.user)
        
        return Response({
            'total_reported': user_items.count(),
            'lost': user_items.filter(status='LOST').count(),
            'found': user_items.filter(status='FOUND').count(),
            'resolved': user_items.filter(status='RESOLVED').count(),
            'total_views': user_items.aggregate(total=Count('views_count'))['total'] or 0,
            'categories': user_items.values('category').annotate(count=Count('id')),
        })
    
    @action(detail=False, methods=['get'])
    def hotspots(self, request):
        """Campus hotspots where items are commonly lost/found"""
        hotspots = Item.objects.values('building', 'status').annotate(
            count=Count('id')
        ).order_by('-count')[:20]
        
        return Response(hotspots)

class SuccessStoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SuccessStory.objects.filter(is_published=True)
    serializer_class = SuccessStorySerializer
    permission_classes = [permissions.AllowAny]

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)