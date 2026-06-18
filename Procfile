web: mkdir -p staticfiles && gunicorn lostfound_backend.wsgi:application --bind 0.0.0.0:$PORT
release: python manage.py collectstatic --noinput && python manage.py migrate --noinput
