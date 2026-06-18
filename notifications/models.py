from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('MATCH_FOUND', 'Match Found'),
        ('ITEM_CLAIMED', 'Item Claimed'),
        ('CLAIM_UPDATED', 'Claim Status Updated'),
        ('MESSAGE_RECEIVED', 'New Message'),
        ('ITEM_RESOLVED', 'Item Resolved'),
    ]

    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    link = models.CharField(max_length=500, blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_notification_type_display()} for {self.recipient.username}"