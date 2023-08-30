import factory
import random
from project.product.models import Brand, Category, Product


class BrandFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Brand

    name = factory.Sequence(lambda n: "test_brand_%d" % n)


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    # name = "test_category"
    name = factory.Sequence(lambda n: "test_category_%d" % n)


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = "test_product"
    description = "test_description"
    is_digital = True
    price = random.randint(100, 10000)
    brand = factory.SubFactory(BrandFactory)
    category = factory.SubFactory(CategoryFactory)
