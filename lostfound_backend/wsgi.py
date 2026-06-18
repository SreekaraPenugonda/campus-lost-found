"""
WSGI config for lostfound_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from pathlib import Path
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lostfound_backend.settings')

# Ensure staticfiles directory exists before Django starts
BASE_DIR = Path(__file__).resolve().parent.parent.parent
staticfiles_dir = BASE_DIR / 'staticfiles'
staticfiles_dir.mkdir(parents=True, exist_ok=True)

application = get_wsgi_application()