from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from icims_backend.LoginApi import UserLoginAPI, ObtainTokenView
from icims_backend.AdminDashboard import admin_urls
from icims_backend.Frontend import frontend_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', UserLoginAPI.as_view(), name='user_login'),
    path('api/obtain-token/', ObtainTokenView.as_view(), name='obtain_token'),
    path('api/admin/', include(admin_urls)),
    path('api/frontend/', include(frontend_urls)),
]

# Serve static and media files during development
if settings.DEBUG:
    # Serve regular media files
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    # Serve static files
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
    # Serve ML materials separately
    if hasattr(settings, 'ML_MATERIALS_URL') and hasattr(settings, 'ML_MATERIALS_ROOT'):
        urlpatterns += static(settings.ML_MATERIALS_URL, document_root=settings.ML_MATERIALS_ROOT)