from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    receiver_username = serializers.ReadOnlyField(source='receiver.username')

    class Meta:
        model = ChatMessage
        fields = [
            'id', 'item', 'sender', 'sender_username',
            'receiver', 'receiver_username', 'message',
            'created_at', 'is_read'
        ]
        read_only_fields = ['sender', 'created_at', 'is_read']