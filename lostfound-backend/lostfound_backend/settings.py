import os
from pathlib import Path
from datetime import timedelta
import dj_database_url  # Add this import

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# ===== SECURITY =====
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-this-in-production')
DEBUG = os.getenv('DEBUG', 'False') == 'True'  # Changed: Default to False in production

# ===== ALLOWED HOSTS =====
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',  # Allows any railway.app subdomain
    '.vercel.app',   # Allows any vercel.app subdomain
    'positive-upliftment-production-ecca.up.railway.app',  # Your Railway URL
    'lostfound-91o649pb1-srees-projects-96decc11.vercel.app',  # Your Vercel URL
    'lostfound-web-two.vercel.app',  # Your other Vercel URL
]

# ===== INSTALLED APPS =====
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'users',
    'items',
    'claims',
    'chat',
    'notifications',
    'matching',
]

# ===== MIDDLEWARE =====
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Keep this for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'lostfound_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'lostfound_backend.wsgi.application'

# ===== DATABASE - FIXED FOR POSTGRESQL =====
# Use PostgreSQL on Railway, SQLite only for local development
if os.getenv('DATABASE_URL'):
    # Production: Use PostgreSQL from Railway
    DATABASES = {
        'default': dj_database_url.config(
            default=os.getenv('DATABASE_URL'),
            conn_max_age=600,
            ssl_require=True
        )
    }
else:
    # Local development: Use SQLite
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# ===== AUTHENTICATION =====
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ===== STATIC & MEDIA FILES =====
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
os.makedirs(STATIC_ROOT, exist_ok=True)

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ===== REST FRAMEWORK =====
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ===== CORS - UPDATED =====
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = False  # Keep False since you're using JWT

# Add ALL your frontend URLs here
CORS_ALLOWED_ORIGINS = [
    # Local development
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    
    # Railway backend (your own backend - though not needed, but safe to include)
    "https://positive-upliftment-production-ecca.up.railway.app",
    
    # Vercel frontend - ALL variants
    "https://lostfound-91o649pb1-srees-projects-96decc11.vercel.app",
    "https://lostfound-web-two.vercel.app",
    "https://lostfound-web-two.vercel.app:443",
    
    # Add any Vercel preview URLs (they change per deployment)
    # Example: "https://lostfound-git-branch-srees.vercel.app",
]

# CSRF Trusted Origins (for POST/PUT/DELETE requests with cookies)
CSRF_TRUSTED_ORIGINS = [
    "https://positive-upliftment-production-ecca.up.railway.app",
    "https://lostfound-91o649pb1-srees-projects-96decc11.vercel.app",
    "https://lostfound-web-two.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
]

# ===== EMAIL =====
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Optional: If you want to use real email in production, add:
# if not DEBUG:
#     EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
#     EMAIL_HOST = os.getenv('EMAIL_HOST')
#     EMAIL_PORT = os.getenv('EMAIL_PORT')
#     EMAIL_USE_TLS = True
#     EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
#     EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')