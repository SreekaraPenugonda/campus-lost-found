from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'item', 'sender', 'receiver', 'is_read', 'created_at']
    list_filter = ['is_read']
    search_fields = ['message', 'sender__username', 'receiver__username']