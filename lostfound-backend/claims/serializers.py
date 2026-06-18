from rest_framework import serializers
from .models import Claim

class ClaimSerializer(serializers.ModelSerializer):
    claimant_username = serializers.ReadOnlyField(source='claimant.username')
    item_title = serializers.ReadOnlyField(source='item.title')

    class Meta:
        model = Claim
        fields = [
            'id', 'item', 'item_title', 'claimant', 'claimant_username',
            'description', 'proof_details', 'status', 'admin_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['claimant', 'status', 'admin_notes', 'created_at', 'updated_at']