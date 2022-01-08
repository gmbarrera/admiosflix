from django.contrib import admin

from movie.models import Movie, Genre

admin.site.register(Genre)
admin.site.register(Movie)
