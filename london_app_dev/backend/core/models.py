"""
Core class models come here
"""
from django.db import models

# Create your models here.


class Recipe(models.Model):
    """_summary_

    Args:
        models (_type_): _description_

    Returns:
        _type_: _description_
    """
    name = models.CharField(max_length=100)
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

class Ingredient(models.Model):
    """_summary_

    Args:
        models (_type_): _description_

    Returns:
        _type_: _description_
    """
    name = models.CharField(max_length=100)
    recipes = models.ManyToManyField(Recipe, related_name='ingredients')

    def __str__(self):
        return str(self.name)