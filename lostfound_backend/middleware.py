# NOTE:
# This project uses django-cors-headers for CORS.
# Do not force permissive CORS headers here (they can break browser behavior,
# especially when credentials are involved).

# Kept only for reference; not used in production.
class ForceCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)
