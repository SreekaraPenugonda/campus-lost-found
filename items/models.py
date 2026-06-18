from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Item(models.Model):
    CATEGORY_CHOICES = [
        ('ELECTRONICS', '📱 Electronics'),
        ('BOOKS', '📚 Books & Stationery'),
        ('ID_CARDS', '🪪 ID Cards & Documents'),
        ('BAGS', '🎒 Bags & Luggage'),
        ('CLOTHING', '👕 Clothing & Accessories'),
        ('KEYS', '🔑 Keys & Keychains'),
        ('OTHER', '📦 Other'),
    ]
    
    STATUS_CHOICES = [
        ('LOST', '🟢 Lost'),
        ('FOUND', '🔵 Found'),
        ('RESOLVED', '✅ Resolved'),
    ]
    
    URGENCY_CHOICES = [
        ('LOW', '🟢 Low'),
        ('MEDIUM', '🟡 Medium'),
        ('HIGH', '🔴 High'),
    ]
    
    # Basic info
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='LOST')
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='MEDIUM')
    
    # Location (enhanced for maps)
    building = models.CharField(max_length=100)
    room = models.CharField(max_length=50, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    
    # Dates
    date_reported = models.DateTimeField(auto_now_add=True)
    date_occurred = models.DateTimeField(default=timezone.now)
    date_resolved = models.DateTimeField(blank=True, null=True)
    
    # Relations
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    
    # Optional details
    image = models.ImageField(upload_to='items/', blank=True, null=True)
    color = models.CharField(max_length=50, blank=True)
    brand = models.CharField(max_length=100, blank=True)
    model = models.CharField(max_length=100, blank=True)
    serial_number = models.CharField(max_length=100, blank=True, null=True)
    
    # Matching info (for smart matching)
    additional_details = models.JSONField(default=dict, blank=True)
    
    # QR & tracking
    qr_code = models.CharField(max_length=100, blank=True, null=True, unique=True)
    
    # Metadata
    is_active = models.BooleanField(default=True)
    views_count = models.IntegerField(default=0)
    is_anonymous = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"
    
    class Meta:
        ordering = ['-date_reported']
        verbose_name = 'Item'
        verbose_name_plural = 'Items'
        
    def get_location_display(self):
        if self.room:
            return f"{self.building} - Room {self.room}"
        return self.building

class SuccessStory(models.Model):
    """Recovery success stories"""
    lost_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='success_story_lost')
    found_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='success_story_found')
    story = models.TextField()
    recovered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='stories')
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Success stories'

    def __str__(self):
        return f"Success: {self.lost_item.title}"

class Feedback(models.Model):
    """User feedback on recovery process"""
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='feedback')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedback')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.item.title} by {self.user.username}"