.PHONY: all install frontend-run backend-run clean

all: frontend backend

install:
	cd ./client && npm install

frontend-run: install
	cd ./client && npm start

backend-run:
	node server.js

clean:
	cd ./client && npm ci
	rm -rf node_modules
	cd ./client && rm -rf node_modules