from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework import status

from .models import Genre


class GenreTestCase(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/genre/'
        self.user = User.objects.create_superuser(
            username='test',
            password='Passw0rd',
            email='test@test.com'
        )
        self.client.force_login(self.user)

        self.genre1 = Genre.objects.create(description='Testing 1')
        self.genre2 = Genre.objects.create(description='Testing 2')

        self.valid_genre = {
            'description': 'testing'
        }
        self.invalid_genre = {
            'description': ''
        }

    def test_create_valid_genre(self):
        """Ensure can create a new genre object"""
        response = self.client.post(
            self.url,
            self.valid_genre,
            format='json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            Genre.objects.get(pk=response.data['id']).description, 
            'testing'
        )

    def test_create_invalid_genre(self):
        """Ensure can not create a new genre object without description"""
        response = self.client.post(
            self.url,
            self.invalid_genre,
            format='json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_valid_genre(self):
        """Ensure can update a genre object with valid data"""
        response = self.client.put(
            self.url + str(self.genre1.pk) + '/',
            self.valid_genre,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            Genre.objects.get(pk=self.genre1.pk).description,
            self.valid_genre['description']
        )
        
    def test_update_invalid_genre(self):
        """Ensure can not update a genre object without description"""
        response = self.client.put(
            self.url + str(self.genre1.pk) + '/',
            self.invalid_genre,
            format='json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_by_id_genre(self):
        """Ensure can get a genre using its id"""
        response = self.client.get(self.url + str(self.genre1.pk) + '/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.genre1.id)
        self.assertEqual(response.data['description'], self.genre1.description)

    def test_delete_genre(self):
        """Ensure can delete a genre using its id"""
        response = self.client.delete(self.url + str(self.genre1.pk) + '/')

        self.assertIn(response.status_code, 
            [status.HTTP_200_OK, 
             status.HTTP_202_ACCEPTED, 
             status.HTTP_204_NO_CONTENT]
        )
        self.assertEqual(Genre.objects.filter(pk=self.genre1.pk).first(), None)
