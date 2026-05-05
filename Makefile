.PHONY: all install frontend-run backend-run clean

# all: frontend backend

install:
	npm install

frontend-run: install
	npm run dev -- --host

backend-run:
	node server.js

clean:
	npm ci
	rm -rf node_modules