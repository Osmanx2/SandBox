package main

import (
	"log"

	"ratings-api/database"
	"ratings-api/health"
	"ratings-api/ratings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	database.ConnectDB()
	defer database.DB.Close()

	api := app.Group("/api")
	ratings.Register(api, database.DB)
	health.Register(api)

	log.Fatal(app.Listen(":5004"))
}
