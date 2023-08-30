.PHONY: migrate run-server superuser spectacular coverage

migrate:
	python3 project/manage.py makemigrations; python3 project/manage.py migrate

run-server:
	python3 project/manage.py runserver

superuser:
	python3 project/manage.py createsuperuser

spectacular:
	python3 project/manage.py spectacular --file schema.yml

coverage:
	coverage run -m pytest
