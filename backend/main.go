package main

import (
	"coffeeHouse_API/api"
	db "coffeeHouse_API/db/sqlc"
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

const (
	driverName    = "postgres"
	dataSource    = "postgresql://root:j1751502021@localhost:5432/coffeeHouse?sslmode=disable"
	serverAddress = "0.0.0.0:8080"
)

func main() {
	conn, err1 := sql.Open(driverName, dataSource)
	if err1 != nil {
		log.Fatal("Cannot connect to db: ", err1)
	}

	store := db.NewStore(conn)

	server := api.NewServer(store)
	err2 := server.StartServer(serverAddress)
	if err2 != nil {
		log.Fatal("Cannot connect to db: ", err2)
	}
}
