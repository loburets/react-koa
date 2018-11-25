# TT Developers School project template

This repo contains the template of the project for TT Developers School 2018.

## Requirements:
1. Node v10.x
2. NPM v5.x
3. MysQL

## How to install requirements:
1. npm install
2. cd ./frontend && npm install

## How to run app:
1. npm start
2. open http://localhost:3000/

## Repo contains:
1. docker-compose file with postgres db. You can change db_user and db_password in docker-compose.yml file.

## How to use Docker:
* npm run docker-build: to download images if it's still not exist
* npm run docker-start: start postgres within docker containers
* npm run docker-clean: turn containers off.

