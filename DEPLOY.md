# Railway Deployment Guide

## 🚀 Quick Deploy Checklist

### 1. Commit and Push
```bash
git add .
git commit -m "Fix: Railway deployment configuration"
git push origin main
```

### 2. Railway Dashboard Settings
Go to: https://railway.app → Your Project → **Settings**

#### Build Command
```
python manage.py migrate --noinput && python manage.py collectstatic --noinput
```

#### Start Command
```
mkdir -p staticfiles && gunicorn lostfound_backend.wsgi:application --bind 0.0.0.0:$PORT
```

### 3. Click "Deploy" Button

---

## 🔍 If Still Failing

### Check Build Logs
In Railway dashboard, click **"Build Logs"** tab. You should see:
```
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying users.0001_initial... OK
  ...
Collecting static files...
```

If you DON'T see this, the build command is still wrong.

### Check Deploy Logs
Click **"Deploy Logs"** tab. You should see:
```
Starting gunicorn 21.2.0
Listening at: http://0.0.0.0:8080
```

If you see port 8080 instead of `$PORT`, the start command is wrong.

---

## 🛠️ Common Issues

### Issue: "no such table: auth_user"
**Cause**: Migrations didn't run  
**Fix**: Set Build command to `python manage.py migrate --noinput && python manage.py collectstatic --noinput`

### Issue: "No directory at: /app/staticfiles/"
**Cause**: Static files directory not created  
**Fix**: Start command includes `mkdir -p staticfiles &&`

### Issue: 404 on root URL
**Cause**: No root URL configured  
**Fix**: Already fixed in urls.py - root returns API info

### Issue: Port 8080 hardcoded
**Cause**: Start command missing `--bind 0.0.0.0:$PORT`  
**Fix**: Update start command

---

## ✅ Verification Steps

After deployment succeeds:

1. **Test Root**: https://your-app.up.railway.app/
   - Should return JSON with API info

2. **Test API**: https://your-app.up.railway.app/api/
   - Should return API root

3. **Test Admin**: https://your-app.up.railway.app/admin/
   - Should show login page (not 404)

4. **Create Superuser** (one-time):
   ```bash
   railway run python manage.py createsuperuser
   ```

---

## 📁 Config Files Reference

### railpack.json
```json
{
  "deploy": {
    "startCommand": "mkdir -p staticfiles && gunicorn lostfound_backend.wsgi:application --bind 0.0.0.0:$PORT",
    "buildCommand": "python manage.py migrate --noinput && python manage.py collectstatic --noinput"
  },
  "packages": {
    "python": "3.10"
  }
}
```

### Procfile
```
web: mkdir -p staticfiles && gunicorn lostfound_backend.wsgi:application --bind 0.0.0.0:$PORT
release: python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

### Key Settings in settings.py
- `SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')`
- `ALLOWED_HOSTS` includes Railway domain
- `STATIC_ROOT` and `STATICFILES_STORAGE` configured
- WhiteNoise middleware enabled

---

## 🎯 Success Criteria

- ✅ Build logs show migrations running
- ✅ Build logs show static files collected
- ✅ App starts on dynamic port (not 8080)
- ✅ No "no such table" errors
- ✅ No "staticfiles directory" warnings
- ✅ Admin login page loads
- ✅ API endpoints respond

---

## 💡 Pro Tip

**Always use Railway Dashboard** to set commands, not the CLI. The CLI has encoding issues on Windows.

If Railway dashboard shows empty Build/Start commands, manually paste the commands above.