package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/Ajjack4/fiber_auth/internal/models"
	"github.com/gofiber/fiber/v2"
)

func GetNeabyCafes(c *fiber.Ctx) error {
	apiKey := os.Getenv("UNRIVAL")
	if apiKey == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Missing API key",
		})
	}
	longitude := c.Query("lat")
	latitude := c.Query("long")
	if longitude == "" || latitude == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing latitude and longitude parameters",
		})
	}
	url := fmt.Sprintf(
		"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s,%s&radius=1500&type=cafe&key=%s",
		latitude, longitude, apiKey,
	)
	resp, err := http.Get(url)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to retrieve nearby cafes",
		})
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return c.Status(resp.StatusCode).JSON(fiber.Map{
			"message": "Failed to retrieve nearby cafes",
		})
	}

	var placesResponse models.GooglePlacesResponse

	if err := json.NewDecoder(resp.Body).Decode(&placesResponse); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to parse API response"})
	}
	cafes := make([]fiber.Map, 0)
	for _, results := range placesResponse.Result {
		photoURL := ""
		if len(results.Photos) > 0 {
			photoURL = fmt.Sprintf(
				"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=%s&key=%s",
				results.Photos[0].PhotoReference, apiKey,
			)
		}
		cafes = append(cafes, fiber.Map{
			"name":          results.Name,
			"vicinity":      results.Vicinity,
			"rating":        results.Rating,
			"opening_hours": results.OpeningHours,
			"photo":         photoURL,
		})
	}

	return c.JSON(fiber.Map{"cafes": cafes})
}
