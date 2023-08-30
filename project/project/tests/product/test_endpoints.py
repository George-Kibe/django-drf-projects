import pytest
import json

pytestmark = pytest.mark.django_db


class TestCategoryEndpoints:
    endpoint = "/api/category/"

    def test_category_get(self, category_factory, api_client):
        # Arrange
        # category_factory()
        category_factory.create_batch(4)

        # Action
        response = api_client.get(self.endpoint)
        assert response.status_code == 200
        # assert response.json() == [{}]
        # assert response.json()["count"] == 4
        print("Response Content: ", json.loads(response.content))
        assert len(json.loads(response.content)) == 4


class TestBrandEndpoints:
    endpoint = "/api/brand/"

    def test_brand_get(self, brand_factory, api_client):
        # Arrange
        # brand_factory()
        brand_factory.create_batch(4)

        # Action
        response = api_client.get(self.endpoint)
        assert response.status_code == 200
        # assert response.json() == [{}]
        # assert response.json()["count"] == 4
        print("Response Content: ", json.loads(response.content))
        assert len(json.loads(response.content)) == 4


class TestProductEndpoints:
    endpoint = "/api/products/"

    def test_product_get(self, product_factory, api_client):
        # Arrange
        # product_factory()
        product_factory.create_batch(4)

        # Action
        response = api_client.get(self.endpoint)
        assert response.status_code == 200
        # assert response.json() == [{}]
        # assert response.json()["count"] == 4
        print("Response Content: ", json.loads(response.content))
        assert len(json.loads(response.content)) == 4
