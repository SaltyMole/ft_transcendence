.PHONY: all install frontend-run backend-run clean ai-certs certs frontend-setup backend-setup ai-setup ai-run backend-stop backend-run tmp-backend-run

# all: frontend backend

SHELL := /bin/zsh

frontend-setup:
	cd frontend && npm install

frontend-run:
	cd frontend && npm run dev -- --host

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

backend-setup: certs
	cd api && cp .env.example .env
	docker compose up -d
	cd api && npm install
	cd api && npx drizzle-kit push --force

ai-setup: ai-certs
	cd AI && python -m venv venv
	source ./AI/venv/bin/activate && pip install --upgrade pip
	source ./AI/venv/bin/activate && pip install -r ./AI/requirements.txt

ai-run:
	source ./AI/venv/bin/activate && python ./AI/server.py

backend-run:
	cd api && npm run dev

tmp-backend-run:
	cd api && node server.js

backend-stop:
	docker compose down
	cd api && rm .env
