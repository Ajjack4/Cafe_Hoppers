package router

import (
	"time"

	"github.com/Ajjack4/fiber_auth/internal/handlers"
	"github.com/Ajjack4/fiber_auth/internal/middlewares"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
)

func SetupRoutes(app *fiber.App) {
	//User routes
	app.Post("/login", handlers.LoginHandler)
	app.Post("/signup", handlers.SignupHandler)
	auth := app.Group("/api/v1/auth")

	auth.Use("/", middlewares.Protected())
	auth.Put("/update", handlers.UpdateHandler)
	auth.Delete("/logout", handlers.DeleteHandler)

	//Map Api routes
	api := app.Group("/api/v1/nearby-cafes")
	api.Use(limiter.New(limiter.Config{
		Max:        8,                // Maximum number of requests
		Expiration: 15 * time.Second, // Time duration for limit reset
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP() // Use IP as the key to identify clients
		},
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"error": "Too many requests, please try again later.",
			})
		},
	}))
	api.Get("/", handlers.GetNeabyCafes)
	api.Get("/place-detail/:id", handlers.GetNearbyCafeByID)

}
