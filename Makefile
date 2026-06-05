.PHONY: all install frontend-run backend-run clean

# all: frontend backend

install:
	cd frontend && npm install
	cd api && npm install

frontend-run:
	cd frontend && npm run dev -- --host

backend-run:
	cd api && node server.js

clean:
	npm ci
	rm -rf node_modules