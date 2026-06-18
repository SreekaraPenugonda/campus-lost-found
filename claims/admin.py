from django.contrib import admin
from .models import Claim

@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ['id', 'item', 'claimant', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['item__title', 'claimant__username']
    readonly_fields = ['created_at', 'updated_at']