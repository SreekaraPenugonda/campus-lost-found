"""
Notification utility functions.
These helpers create notifications in response to system events.
"""
from .models import Notification

def notify_match_found(user, lost_item, found_item, score):
    """Notify user when a potential match is found"""
    Notification.objects.create(
        recipient=user,
        notification_type='MATCH_FOUND',
        title='Potential Match Found!',
        message=f'We found a potential match for your {lost_item.title} '
                f'with a {score}% confidence score.',
        link=f'/item/{found_item.id}'
    )

def notify_claim_submitted(item_owner, claim):
    """Notify item owner when someone claims their item"""
    Notification.objects.create(
        recipient=item_owner,
        notification_type='ITEM_CLAIMED',
        title='New Claim on Your Item',
        message=f'{claim.claimant.username} has claimed your {claim.item.title}.',
        link=f'/item/{claim.item.id}'
    )

def notify_claim_updated(claim):
    """Notify claimant when their claim status changes"""
    Notification.objects.create(
        recipient=claim.claimant,
        notification_type='CLAIM_UPDATED',
        title='Claim Status Updated',
        message=f'Your claim for {claim.item.title} has been {claim.get_status_display()}.',
        link=f'/item/{claim.item.id}'
    )

def notify_new_message(recipient, sender, item):
    """Notify user about a new chat message"""
    Notification.objects.create(
        recipient=recipient,
        notification_type='MESSAGE_RECEIVED',
        title='New Message',
        message=f'{sender.username} sent you a message about {item.title}.',
        link=f'/chat?item={item.id}&user={sender.id}'
    )

def notify_item_resolved(item):
    """Notify reporter when their item is marked as resolved"""
    Notification.objects.create(
        recipient=item.reported_by,
        notification_type='ITEM_RESOLVED',
        title='Item Resolved',
        message=f'Your item "{item.title}" has been marked as resolved.',
        link=f'/item/{item.id}'
    )