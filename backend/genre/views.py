from rest_framework import viewsets
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .models import Genre, GenreSerializer


class GenreViewSet(viewsets.ModelViewSet):
    """Genre resource."""
    queryset = Genre.objects.all().order_by('description')
    serializer_class = GenreSerializer

    @swagger_auto_schema(
        operation_id='List of genres',
        operation_description='This endpoint return a list of movie genres',
    )
    def list(self, request, **kwargs):
        serializer = GenreSerializer(self.queryset, many=True)
        return Response(serializer.data)
