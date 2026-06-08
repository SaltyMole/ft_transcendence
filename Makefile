.PHONY: all install frontend-run backend-run clean

# all: frontend backend

frontend-setup:
	cd frontend && npm install

frontend-run:
	cd frontend && npm run dev -- --host

backend-setup:
	cd api && cp .env.example .env
	docker compose up -d
	cd api && npm install
	cd api && npx drizzle-kit push --force

backend-run:
	cd api && npm run dev

tmp-backend-run:
	cd api && node server.js

backend-stop:
	docker compose down
	cd api && rm .env
