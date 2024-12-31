package main

import (
	"log"

	// "github.com/Ajjack4/fiber_auth/config"
	"github.com/Ajjack4/fiber_auth/database"
	"github.com/Ajjack4/fiber_auth/router"

	"github.com/gofiber/fiber/v2"
)

func customCORS() fiber.Handler {
	return func(c *fiber.Ctx) error {
		allowedOrigins := []string{"http://localhost:5173"}
		origin := c.Get("Origin")

		// Check if the origin is in the allowed list
		for _, o := range allowedOrigins {
			if o == origin {
				c.Set("Access-Control-Allow-Origin", origin)
				break
			}
		}
		c.Set("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, DELETE, PATCH, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		c.Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight request
		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusNoContent)
		}

		return c.Next()
	}
}
func main() {
	// Initialize the database
	// if err := config.InitDB(); err != nil {
	// 	log.Fatalf("Failed to connect to the database: %v", err)
	// }
	// defer config.DB.Close()
	database.MysqlConnectDb()

	// Initialize Fiber app
	app := fiber.New()
	app.Use(customCORS())
	router.SetupRoutes(app)

	// Start the server
	log.Fatal(app.Listen(":3000"))
}
