from django.contrib import admin
from .models import MatchResult

@admin.register(MatchResult)
class MatchResultAdmin(admin.ModelAdmin):
    list_display = ['lost_item', 'found_item', 'score', 'is_notified', 'created_at']
    list_filter = ['score', 'is_notified']
    search_fields = ['lost_item__title', 'found_item__title']