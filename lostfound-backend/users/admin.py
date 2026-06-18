from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'university_id', 'phone_number', 'is_email_verified']
    search_fields = ['user__email', 'university_id']