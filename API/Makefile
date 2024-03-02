postgres:
	docker run --name postgres13 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=j1751502021 -d postgres:12-alpine
stoppostgres:
	docker stop postgres13
removepostgres:
	docker rm postgres13
createdb:
	docker exec -it postgres13 createdb --username=root --owner=root coffeeHouse
dropdb:
	docker exec -it postgres13 dropdb coffeeHouse
migrateup:
	migrate -path db/migration -database "postgresql://root:j1751502021@localhost:5432/coffeeHouse?sslmode=disable" -verbose up
migratedown:
	migrate -path db/migration -database "postgresql://root:j1751502021@localhost:5432/coffeeHouse?sslmode=disable" -verbose down
sqlc:
	sqlc generate
.PHONY: postgres stoppostgres removepostgres createdb dropdb migrateup migratedown
