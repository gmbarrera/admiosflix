from rest_framework import viewsets
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from .models import MovieMember, MovieMemberSerializer


class MovieMemberViewSet(viewsets.ModelViewSet):
    """Movie resource."""
    queryset = MovieMember.objects.all().order_by('lastname')
    serializer_class = MovieMemberSerializer

    @swagger_auto_schema(
        manual_parameters=[openapi.Parameter(
            'partial_name',
            in_=openapi.IN_QUERY,
            description='Partial Name',
            type=openapi.TYPE_STRING
        )],
        operation_id='List of filtered Cast & Crew',
        operation_description='This endpoint return a list of movie members',
    )
    def list(self, request, **kwargs):
        partial_name = request.query_params.get('partial_name', '')
        
        queryset = self.filter_queryset(
            self.queryset
        ).filter(lastname__icontains=partial_name)
        
        serializer = MovieMemberSerializer(queryset, many=True)
        return Response(serializer.data)
