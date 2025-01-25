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
type PlaceDetailsResponse struct {
	Result struct {
		Place_ID          string  `json:"place_id"`
		Name              string  `json:"name"`
		Vicinity          string  `json:"vicinity"`
		Rating            float64 `json:"rating"`
		User_Rating_Total int     `json:"user_ratings_total"`
		Photos            []struct {
			PhotoReference string `json:"photo_reference"`
			Height         int    `json:"height"`
			Width          int    `json:"width"`
		} `json:"photos"`
		Reviews []struct {
			ProfilePhoto string `json:"profile_photo_url"`
			AuthorName   string `json:"author_name"`

			TimeOfReview string  `json:"relative_time_description"`
			Rating       float64 `json:"rating"`
			ReviewText   string  `json:"text"`
		} `json:"reviews"`
	} `json:"result"`
	Status string `json:"status"`
}

// type PlaceDetailsResponse struct {
//     Result struct {
//         PlaceID             string  `json:"place_id"`
//         Name                string  `json:"name"`
//         FormattedAddress    string  `json:"formatted_address"`
//         Rating              float64 `json:"rating"`
//         UserRatingsTotal    int     `json:"user_ratings_total"`
//         OpeningHours struct {
//             OpenNow bool `json:"open_now"`
//         } `json:"opening_hours"`
//         Geometry struct {
//             Location struct {
//                 Lat float64 `json:"lat"`
//                 Lng float64 `json:"lng"`
//             } `json:"location"`
//         } `json:"geometry"`
//         Photos []struct {
//             PhotoReference string `json:"photo_reference"`
//             Height         int    `json:"height"`
//             Width          int    `json:"width"`
//         } `json:"photos"`
//     } `json:"result"`
//     Status string `json:"status"`
// }
