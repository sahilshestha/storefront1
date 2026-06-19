from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.IntegerField()
    Product_name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    category = models.CharField(max_length=100)
    description = models.TextField()
    Paid = models.BooleanField(default=False)
    stock = models.IntegerField()


class Category (models.Model):
    Category_name = models.CharField(max_length=100)
    description = models.TextField()
    isactive = models.BooleanField(default=True)
    category_id = models.IntegerField()


class Brand (models.Model):
    Brand_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    Brand_name = models.CharField(max_length=100)
    description = models.TextField()


class Orders (models.Model):
    Brand_id = models.IntegerField()
    Category_Name = models.CharField(max_length=100)
    total_price = models.FloatField()
    # Order_id = models.ForeignKey()
    product_id = models.IntegerField


