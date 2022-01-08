from django.contrib import admin
from django.urls import path
from django.urls import include, re_path

from rest_framework import routers
from rest_framework import permissions

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from genre import views as genre_views
from movie import views as movie_views
from movie_member import views as movie_member_views


router = routers.DefaultRouter()
router.register(r'genre', genre_views.GenreViewSet, 'genre')
router.register(r'movie', movie_views.MovieViewSet, 'movie')
router.register(r'moviemember', movie_member_views.MovieMemberViewSet, 'movie_member')

schema_view = get_schema_view(
    openapi.Info(
        title="AdmiosFlix API",
        default_version='v1',
        description="Movie online for everyone",
        contact=openapi.Contact(email="gmbarrera@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    re_path(r'^doc(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'), 
]
