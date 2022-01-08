from django.db import models
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _


MEMBER_ROL = (
    ('1', 'Actor/Actress'),
    ('2', 'Director'),
    ('3', 'Producer'),
)

class MovieMember(models.Model):
    firstname = models.CharField(
        _('firstname'),
        max_length=100
    )
    lastname = models.CharField(
        _('lastname'),
        max_length=100
    )
    rol = models.CharField(
        _('rol'),
        choices=MEMBER_ROL,
        max_length=1
    )

    def __str__(self) -> str:
        return '{} {}'.format(self.firstname, self.lastname)


class ChoiceField(serializers.ChoiceField):
    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)


class MovieMemberSerializer(serializers.ModelSerializer):
    rol =  ChoiceField(choices=MEMBER_ROL)
    
    class Meta:
        model = MovieMember
        fields =  '__all__'
    