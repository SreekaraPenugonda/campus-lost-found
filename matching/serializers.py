from rest_framework import serializers
from .models import MatchResult

class MatchResultSerializer(serializers.ModelSerializer):
    lost_item_title = serializers.ReadOnlyField(source='lost_item.title')
    lost_item_building = serializers.ReadOnlyField(source='lost_item.building')
    lost_item_category = serializers.ReadOnlyField(source='lost_item.category')
    lost_item_reported_by = serializers.ReadOnlyField(source='lost_item.reported_by.username')
    lost_item_date = serializers.ReadOnlyField(source='lost_item.date_reported')
    
    found_item_title = serializers.ReadOnlyField(source='found_item.title')
    found_item_building = serializers.ReadOnlyField(source='found_item.building')
    found_item_category = serializers.ReadOnlyField(source='found_item.category')
    found_item_reported_by = serializers.ReadOnlyField(source='found_item.reported_by.username')
    found_item_date = serializers.ReadOnlyField(source='found_item.date_reported')

    class Meta:
        model = MatchResult
        fields = [
            'id', 'lost_item', 'lost_item_title', 'lost_item_building',
            'lost_item_category', 'lost_item_reported_by', 'lost_item_date',
            'found_item', 'found_item_title', 'found_item_building',
            'found_item_category', 'found_item_reported_by', 'found_item_date',
            'score', 'is_notified', 'created_at'
        ]