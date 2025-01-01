package models

type GooglePlacesResponse struct {
	Results []struct {
		Place_ID          string  `json:"place_id"`
		Name              string  `json:"name"`
		Vicinity          string  `json:"vicinity"`
		Rating            float64 `json:"rating"`
		User_Rating_Total int     `json:"user_ratings_total"`
		OpeningHours      struct {
			OpenNow bool `json:"open_now"`
		} `json:"opening_hours"`
		Photos []struct {
			PhotoReference string `json:"photo_reference"`
		} `json:"photos"`
		Geometry struct {
			Location struct {
				Lat float64 `json:"lat"`
				Lng float64 `json:"lng"`
			} `json:"location"`
		} `json:"geometry"`
	} `json:"results"`
}
