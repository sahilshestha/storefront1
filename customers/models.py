from django.db import models

# Create your models here.

class Customer_profile(models.Model):
   Customer_profile_id = models.IntegerField()
   Customer_profile_name = models.TextField()
   Customer_profile_image = models.TextField()
   Customer_profile_phone = models.TextField()
   Customer_email = models.TextField()


class Address(models.Model):
   address_id = models.IntegerField()
   address_line_1 = models.TextField()
   address_line_2 = models.TextField()

