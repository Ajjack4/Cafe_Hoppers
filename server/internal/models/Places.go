package models

type GooglePlacesResponse struct {
	Result []struct {
		Name         string  `json:"name"`
		Rating       float64 `json:"rating"`
		Vicinity     string  `json:"vicinity"`
		OpeningHours string  `json:"openinghours"`
		Photos       []struct {
			PhotoReference string `json:"photo_reference"`
		} `json:"photos"`
	} `json:"results"`
}
