.PHONY: all install frontend backend frontend-dev backend-dev clean fclean re

all: frontend backend

install: frontend/node_modules backend/node_modules

frontend/node_modules:
	cd ./frontend && npm install

backend/node_modules:
	cd ./backend && npm install

frontend: frontend/node_modules
	cd ./frontend && npm run build

backend: backend/node_modules
	cd ./backend && npm run build

frontend-dev: frontend/node_modules
	cd ./frontend && npm run dev

backend-dev: backend/node_modules
	cd ./backend && npm run start:dev

clean:
	rm -rf ./frontend/dist
	rm -rf ./backend/dist

fclean: clean
	rm -rf ./frontend/node_modules
	rm -rf ./backend/node_modules
	rm -rf ./node_modules
	rm -f ./frontend/package-lock.json
	rm -f ./backend/package-lock.json
	rm -f ./package-lock.json
	rm -rf ./backend/pngs

re: fclean all