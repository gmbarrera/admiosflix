from rest_framework import viewsets
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from movie.models import Movie, MovieSerializer, MovieReadSerializer, Genre, GenreSerializer

genre_param = openapi.Parameter(
    'genre',
    in_=openapi.IN_QUERY,
    description='Genre',
    type=openapi.TYPE_INTEGER
)

class MovieViewSet(viewsets.ModelViewSet):
    """Movie resource."""
    queryset = Movie.objects.all().order_by('title')
    serializer_class = MovieSerializer

    @swagger_auto_schema(
        manual_parameters=[genre_param],
        operation_id='List of movies',
        operation_description='This endpoint return a list of movies in the specified genre',
    )
    def list(self, request, **kwargs):
        genre_id = int(request.query_params.get('genre', 0))
        
        queryset = self.filter_queryset(
            self.queryset
        ).filter(genre=genre_id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MovieReadSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MovieReadSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return MovieReadSerializer
        return MovieSerializer

