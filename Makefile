.PHONY: all install frontend-run backend-run clean ai-certs certs frontend-setup backend-setup ai-setup ai-run backend-stop backend-run tmp-backend-run podman-up podman-down frontend-build backend-build ai-build db-setup db-migrate

SHELL := /bin/zsh
PODMAN ?= podman

all: podman-up

frontend-setup:
	$(PODMAN) compose build frontend

frontend-build:
	$(PODMAN) compose build frontend

frontend-run: frontend-build
	$(PODMAN) compose up -d frontend

certs:
	mkdir -p api/certs
	openssl req -x509 -newkey rsa:2048 -keyout api/certs/key.pem -out api/certs/cert.pem \
		-days 365 -nodes -subj "/CN=localhost" \
		-addext "subjectAltName=IP:127.0.0.1,DNS:localhost"

ai-certs:
	mkdir -p AI/certs
	openssl req -x509 -newkey rsa:2048 -keyout AI/certs/key.pem -out AI/certs/cert.pem \
		-days 365 -nodes -subj "/CN=localhost" \
		-addext "subjectAltName=IP:127.0.0.1,DNS:localhost"

backend-build:
	$(PODMAN) compose build api drizzle-studio

backend-run: backend-build
	$(PODMAN) compose up -d api

ai-build:
	$(PODMAN) compose build ai

ai-run: ai-build
	$(PODMAN) compose up -d ai

db-setup:
	$(PODMAN) compose up -d postgres drizzle-studio

db-migrate:
	$(PODMAN) compose exec -T api npx drizzle-kit push --force

podman-up:
	$(PODMAN) compose up -d --build

podman-down:
	$(PODMAN) compose down -v

backend-setup: certs
	cp api/.env.example api/.env
	$(PODMAN) compose up -d --build postgres drizzle-studio api ai frontend

ai-setup: ai-certs
	cd AI && python -m venv venv
	source ./AI/venv/bin/activate && pip install --upgrade pip
	source ./AI/venv/bin/activate && pip install -r ./AI/requirements.txt

tmp-backend-run:
	cd api && node server.js

backend-stop:
	$(PODMAN) compose down -v
	rm -f api/.env
