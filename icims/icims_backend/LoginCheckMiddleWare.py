from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils.deprecation import MiddlewareMixin

User = get_user_model()

class LoginCheckMiddleWare(MiddlewareMixin):
    """
    Middleware to check user login status and redirect accordingly
    """
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        # Define URLs that don't require authentication
        exempt_urls = [
            reverse('admin:login') if 'admin:login' in [url.name for url in __import__('django.urls', fromlist=['get_resolver']).get_resolver().url_patterns] else '/admin/login/',
            '/login/',
            '/register/',
            '/api/login/',
            '/api/register/',
        ]
        
        # Allow access to exempt URLs and static/media files
        if (request.path_info in exempt_urls or 
            request.path_info.startswith('/static/') or 
            request.path_info.startswith('/media/') or
            request.path_info.startswith('/admin/jsi18n/')):
            return None
        
        # Check if user is authenticated
        if not request.user.is_authenticated:
            # Redirect to login page if not authenticated
            # You can customize this redirect based on your needs
            return redirect('/admin/login/')
        
        return None
