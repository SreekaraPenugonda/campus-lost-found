from rest_framework import serializers
from .models import Item, SuccessStory, Feedback
from django.contrib.auth.models import User

class ItemSerializer(serializers.ModelSerializer):
    """Convert Item model to/from JSON"""
    reported_by_username = serializers.ReadOnlyField(source='reported_by.username')
    reported_by_email = serializers.ReadOnlyField(source='reported_by.email')
    location_display = serializers.SerializerMethodField()
    feedback_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = [
            'id', 'title', 'description', 'category', 'status', 'urgency',
            'building', 'room', 'latitude', 'longitude',
            'date_reported', 'date_occurred', 'date_resolved',
            'reported_by', 'reported_by_username', 'reported_by_email',
            'image', 'color', 'brand', 'model', 'serial_number',
            'is_active', 'views_count', 'is_anonymous',
            'qr_code', 'location_display',
            'feedback_count', 'average_rating',
        ]
        read_only_fields = ['date_reported', 'views_count', 'reported_by', 'qr_code']
        extra_kwargs = {
            'room': {'required': False, 'allow_null': True, 'allow_blank': True},
            'color': {'required': False, 'allow_null': True, 'allow_blank': True},
            'brand': {'required': False, 'allow_null': True, 'allow_blank': True},
            'model': {'required': False, 'allow_null': True, 'allow_blank': True},
            'serial_number': {'required': False, 'allow_null': True, 'allow_blank': True},
            'image': {'required': False, 'allow_null': True},
            'latitude': {'required': False, 'allow_null': True},
            'longitude': {'required': False, 'allow_null': True},
        }
    
    def get_location_display(self, obj):
        return obj.get_location_display()
    
    def get_feedback_count(self, obj):
        return obj.feedback.count()
    
    def get_average_rating(self, obj):
        feedbacks = obj.feedback.all()
        if feedbacks:
            return sum(f.rating for f in feedbacks) / len(feedbacks)
        return None
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['reported_by'] = request.user
        return super().create(validated_data)

class ItemListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for lists"""
    reported_by_username = serializers.ReadOnlyField(source='reported_by.username')
    location_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Item
        fields = [
            'id', 'title', 'description', 'category', 'status', 'urgency',
            'building', 'room', 'latitude', 'longitude',
            'date_reported', 'date_occurred',
            'reported_by_username', 'image', 'color', 'brand',
            'views_count', 'location_display', 'is_anonymous',
        ]
    
    def get_location_display(self, obj):
        return obj.get_location_display()

class SuccessStorySerializer(serializers.ModelSerializer):
    lost_item_title = serializers.ReadOnlyField(source='lost_item.title')
    found_item_title = serializers.ReadOnlyField(source='found_item.title')
    recovered_by_name = serializers.ReadOnlyField(source='recovered_by.username')
    
    class Meta:
        model = SuccessStory
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Feedback
        fields = ['id', 'item', 'user', 'username', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']