.PHONY: all install frontend-run backend-run

all: frontend backend

install:
	cd ./client && npm install

frontend-run: install
	cd ./client && npm start

backend-run:
	node server.js