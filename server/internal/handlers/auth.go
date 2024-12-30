package handlers

import (
	//"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/Ajjack4/fiber_auth/config"
	"github.com/Ajjack4/fiber_auth/database"
	"github.com/Ajjack4/fiber_auth/internal/logic"
	"github.com/Ajjack4/fiber_auth/internal/models"
	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var SecretKey = "supersecretkey"

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// SignupHandler handles user registration
func SignupHandler(c *fiber.Ctx) error {
	var req models.User
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request format"})
	}
	if req.Username == "" || req.Password == "" || req.Email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "All the input fields are required"})
	}
	Password, err := logic.HashPassword(req.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password", "details": err.Error()})
	}

	req.Password = Password
	query := "INSERT INTO users (username, password, email) VALUES (?, ?, ?)"
	result, err := config.DB.Exec(query, req.Username, req.Password, req.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save user", "details": err.Error()})
	}

	insertID, err := result.LastInsertId()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get insert ID"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": insertID,
		"exp":     time.Now().Add(time.Minute * 30).Unix(),
	})
	signedToken, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate token"})
	}

	return c.JSON(fiber.Map{"token": signedToken})
}

// LoginHandler handles user login
func LoginHandler(c *fiber.Ctx) error {
	var req models.User
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	var user models.User
	// err := database.Database.Db.QueryRow("SELECT id,username,password FROM users WHERE username=?", req.Username).Scan(&user.ID, &user.Username, &user.Password)
	// if err != nil {
	// 	if err == sql.ErrNoRows {
	// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 			"error": "Invalid credentials",
	// 		})
	// 	}
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 		"error": "Database error",
	// 	})
	// }
	err := database.Database.Db.
		Where("email = ?", req.Email).
		First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Handle case where no user is found
			fmt.Println("User not found")
		} else {
			// Handle other errors
			fmt.Printf("Error fetching user: %v\n", err)
		}
	}
	result := logic.CheckPasswordHash(req.Password, user.Password)
	if !result {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// if req.Password != user.Password {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 		"error": "Invalid credentials",
	// 	})
	// }

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Minute * 30).Unix(),
	})
	signedToken, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not generate token",
		})
	}

	return c.JSON(fiber.Map{
		"token": signedToken,
	})
}

func UpdateHandler(c *fiber.Ctx) error {
	claims := c.Locals("user").(jwt.MapClaims)
	userID := claims["user_id"].(float64)

	var req models.User
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request format",
		})
	}

	if req.Username == "" && req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "At least one field (username or password) must be provided",
		})
	}

	// Update the user in the database
	query := "UPDATE users SET username = ?, password = ? WHERE id = ?"
	_, err := config.DB.Exec(query, req.Username, req.Password, int(userID))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to update user in the database",
			"details": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "User updated successfully",
	})
}
func DeleteHandler(c *fiber.Ctx) error {
	claims := c.Locals("user").(jwt.MapClaims)
	userID := claims["user_id"].(float64)

	// Delete the user from the database
	query := "DELETE FROM users WHERE id = ?"
	_, err := config.DB.Exec(query, int(userID))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to delete user from the database",
			"details": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "User deleted successfully",
	})
}
