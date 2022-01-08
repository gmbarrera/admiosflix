import os
from django.conf import settings
from django.core.management.base import BaseCommand
from django.core import serializers


class Command(BaseCommand):
    help = 'Command to load fixtures when the app start, if needed.'

    def handle(self, *args, **options):
            
        fixture_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../fixtures'))
        
        for fixture_filename in os.listdir(fixture_dir):
            print('Loading ' + fixture_filename)

            fixture_file = os.path.join(fixture_dir, fixture_filename)

            fixture = open(fixture_file, 'rb')
            objects = serializers.deserialize('json', fixture, ignorenonexistent=True)
            for obj in objects:
                obj.save()
            fixture.close()
