from django.db import models
from items.models import Item

class MatchResult(models.Model):
    lost_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='match_lost')
    found_item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='match_found')
    score = models.IntegerField(default=0)
    is_notified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score']
        unique_together = ['lost_item', 'found_item']

    def __str__(self):
        return f"Match: {self.lost_item.title} ↔ {self.found_item.title} ({self.score}%)"