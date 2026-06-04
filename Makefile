.PHONY: all install frontend-run backend-run clean

# all: frontend backend

install:
	npm install

frontend-run:
	cd frontend && npm run dev -- --host

backend-run:
	cd backend && node server.js

clean:
	npm ci
	rm -rf node_modules