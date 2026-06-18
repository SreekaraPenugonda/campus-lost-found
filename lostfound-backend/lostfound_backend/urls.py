from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from items.views import ItemViewSet, SuccessStoryViewSet, FeedbackViewSet
from claims.views import ClaimViewSet
from matching.views import MatchResultViewSet
from chat.views import ChatMessageViewSet
from notifications.views import NotificationViewSet
from users.views import (
    RegisterView, UserProfileView, VerifyEmailView,
    RequestPasswordResetView, ResetPasswordView,
    ChangePasswordView, LoginHistoryView, DeleteAccountView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')
router.register(r'claims', ClaimViewSet, basename='claim')
router.register(r'matches', MatchResultViewSet, basename='match')
router.register(r'chat', ChatMessageViewSet, basename='chat')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'stories', SuccessStoryViewSet, basename='story')
router.register(r'feedback', FeedbackViewSet, basename='feedback')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('api/request-password-reset/', RequestPasswordResetView.as_view(), name='request_password_reset'),
    path('api/reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('api/login-history/', LoginHistoryView.as_view(), name='login_history'),
    path('api/delete-account/', DeleteAccountView.as_view(), name='delete_account'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)