from django.db import models

# Create your models here.
class Order(models.Model):
    order_id = models.IntegerField()
    order_date = models.DateField()
    order_total = models.FloatField()
    order_quantity = models.IntegerField()

class OrderItem(models.Model):
    order_id = models.IntegerField()
    order_date = models.DateField()


