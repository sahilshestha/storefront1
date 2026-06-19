from django.db import models

# Create your models here.
class Cart(models.Model):
    cart_id = models.IntegerField()
    item = models.TextField()
    quantity = models.IntegerField()


class CartItem(models.Model):
    cart_id = models.IntegerField()
    item = models.TextField()

