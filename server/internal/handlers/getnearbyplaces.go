package handlers

import (
	"encoding/json"
	"fmt"
	"io"

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
	longitude := c.Query("lng")
	latitude := c.Query("lat")
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
	for _, result := range placesResponse.Results {
		// photoURL := ""
		// if len(results.Photos) > 0 {
		// 	photoURL = fmt.Sprintf(
		// 		"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=%s&key=%s",
		// 		results.Photos[0].PhotoReference, apiKey,
		// 	)
		// }

		cafes = append(cafes, fiber.Map{
			"place_id":           result.Place_ID,
			"name":               result.Name,
			"vicinity":           result.Vicinity,
			"rating":             result.Rating,
			"user_ratings_total": result.User_Rating_Total,
			"opening_hours":      result.OpeningHours.OpenNow,
			"photo":              result.Photos[0],
			"geometry": fiber.Map{
				"lat": result.Geometry.Location.Lat,
				"lng": result.Geometry.Location.Lng,
			},
		})
	}

	return c.JSON(fiber.Map{"cafes": cafes})
}
func GetNearbyCafeByID(c *fiber.Ctx) error {
	apiKey := os.Getenv("UNRIVAL")
	if apiKey == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Missing API key",
		})
	}

	placeId := c.Params("id")
	if placeId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing Place Id params",
		})
	}

	url := fmt.Sprintf(
		"https://maps.googleapis.com/maps/api/place/details/json?place_id=%v&key=%v", placeId, apiKey,
	)

	resp, err := http.Get(url)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed To retrieve Place Details",
		})
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return c.Status(resp.StatusCode).JSON(fiber.Map{
			"message": "Failed to retrieve Place Details",
		})
	}

	var PlaceDetails models.PlaceDetailsResponse
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to read API response",
		})
	}

	// log.Println(string(body)) // Log the raw response for debugging

	if err := json.Unmarshal(body, &PlaceDetails); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse API response",
		})
	}

	return c.JSON(PlaceDetails)
}
