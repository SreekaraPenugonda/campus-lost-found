from django.db import models
from django.contrib.auth.models import User
from items.models import Item

class Claim(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('RESOLVED', 'Resolved'),
    ]

    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='claims')
    claimant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='claims')
    description = models.TextField(help_text="Describe why this item belongs to you")
    proof_details = models.JSONField(default=dict, blank=True, help_text="Additional proof details")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    admin_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Claim by {self.claimant.username} on {self.item.title}"

    class Meta:
        ordering = ['-created_at']