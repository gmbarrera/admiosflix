from django.db import models
from rest_framework import serializers

from django.utils.translation import gettext_lazy as _

from movie_member.models import MovieMember, MovieMemberSerializer
from genre.models import Genre, GenreSerializer


class Movie(models.Model):
    title = models.CharField(
        _('title'),
        max_length=150
    )
    rating = models.IntegerField(_('rating'))
    release_date = models.DateField(_('release date'))
    genre =  models.ForeignKey(Genre, related_name='movies', on_delete=models.PROTECT)
    members = models.ManyToManyField(
        MovieMember,
        related_name='movies'
    )

    def __str__(self) -> str:
        return self.title


class MovieSerializer(serializers.ModelSerializer):
    """Movie Serializar for POST/PUT operations"""
    class Meta:
        model = Movie
        fields = '__all__'


class MovieReadSerializer(MovieSerializer):
    """Movie Serializar for GET operations"""
    members = MovieMemberSerializer(many=True, read_only=True)
    genre = GenreSerializer(read_only=True)
