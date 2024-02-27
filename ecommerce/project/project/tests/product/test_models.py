import pytest

pytestmark = pytest.mark.django_db


class TestCategoryModel:
    def test_string_method(self, category_factory):
        # Arrange # Action
        category = category_factory(name="test_category")
        # Assert
        assert category.__str__() == "test_category"


class TestBrandModel:
    def test_string_method(self, brand_factory):
        # Arrange # Action
        brand = brand_factory(name="test_brand")
        # Assert
        assert brand.__str__() == "test_brand"


class TestProductModel:
    def test_string_method(self, product_factory):
        # Arrange # Action
        product = product_factory(name="test_product")
        # Assert
        assert product.__str__() == "test_product"
        assert product.name == "test_product"
