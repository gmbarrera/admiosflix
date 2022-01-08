from django.db import models
from rest_framework import serializers

from django.utils.translation import gettext_lazy as _


class Genre(models.Model):
    description = models.CharField(
        _('description'),
        max_length=100
    )

    def __str__(self) -> str:
        return self.description


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
