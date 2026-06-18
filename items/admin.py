from django.contrib import admin
from .models import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'building', 'date_reported', 'views_count']
    list_filter = ['category', 'status', 'building']
    search_fields = ['title', 'description', 'brand', 'serial_number']
    readonly_fields = ['date_reported', 'views_count']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'category', 'status')
        }),
        ('Location Details', {
            'fields': ('building', 'room')
        }),
        ('Date Information', {
            'fields': ('date_occurred', 'date_reported')
        }),
        ('Item Details', {
            'fields': ('color', 'brand', 'model', 'serial_number')
        }),
        ('Media & Meta', {
            'fields': ('image', 'is_active', 'views_count')
        }),
        ('User Information', {
            'fields': ('reported_by',)
        }),
    )