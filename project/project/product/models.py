from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


# Create your models here.
class Category(MPTTModel):
    name = models.CharField(max_length=100, unique=True)
    parent = TreeForeignKey("self", on_delete=models.PROTECT, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    is_digital = models.BooleanField(default=False)
    # category = models.ForeignKey(Category, on_delete=models.CASCADE)
    category = TreeForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
