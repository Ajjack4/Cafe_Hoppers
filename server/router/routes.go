package router

import (
	"github.com/Ajjack4/fiber_auth/internal/handlers"
	"github.com/Ajjack4/fiber_auth/internal/middlewares"
	"github.com/gofiber/fiber/v2"
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
	api := app.Group("/api/v1/getcafes")
	api.Post("/", handlers.GetNeabyCafes)

}
