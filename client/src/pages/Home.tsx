import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Map, { Marker, Popup, ViewStateChangeEvent } from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { UPDATE_COORDINATES } from "../slice/slice";
import { RootState } from "@/slice/stateStore";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyCafes } from "../api/GetNeaby-cafes";
import PlaceCard from "../components/ui/place-card";
import Cafe_Pin from "../assets/Cafe_Pin.png";

type Cafe = {
  place_id: string; // Corresponds to `place_id`
  name: string; // Corresponds to `name`
  vicinity: string; // Corresponds to `vicinity`
  rating: number; // Corresponds to `rating`
  userRatingTotal: number; // Corresponds to `user_ratings_total`
  openNow: boolean | null; // Corresponds to `opening_hours.open_now` (nullable if opening_hours is absent)
  photoReference: string | null; // Corresponds to `photos[0]?.photo_reference` (nullable if no photos are available)
  geometry: Geometry;
};
type Geometry = {
  lat: number;
  lng: number;
};

const Home = () => {
  const dispatch = useDispatch();
  const Coordinates = useSelector((state: RootState) => state.coordinates);
  const [zoom, setZoom] = useState(14);
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]);
  const [loadingCafes, setLoadingCafes] = useState(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [hoveredCafe, setHoveredCafe] = useState<string|null>(null)
  const handleMapMove = (evt: ViewStateChangeEvent) => {
    const { longitude, latitude, zoom } = evt.viewState;
    dispatch(UPDATE_COORDINATES({ longitude, latitude, change: false }));
    setZoom(zoom);
    console.log(evt.target.getBounds);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchCafes();
    }, 1500);
  };
  const fetchCafes = async () => {
    try {
      setLoadingCafes(true);

      const cafes: Cafe[] = await getNearbyCafes(
        Coordinates.longitude,
        Coordinates.latitude
      );
      
      const uniqueCafes: Cafe[] = cafes.filter(
        (cafe) => !nearbyCafes.some((nc) => nc.place_id === cafe.place_id)
      );
      setNearbyCafes([...nearbyCafes, ...uniqueCafes]);
      console.log("cafes:", nearbyCafes);
    } catch (error) {
      console.error("Error fetching nearby cafes:", error);
    } finally {
      setLoadingCafes(false);
    }
  };

  // Fetch nearby cafes when coordinates change
  useEffect(() => {
    return () => {
      fetchCafes();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <div className="relative h-full w-full z-10">
        {/* <PlaceCard
        imageSrc="/placeholder.svg?height=192&width=384"
        name="Cozy Cafe"
        rating={4.5}
        reviewCount={123}
        isOpen={true}
        address="123 Main St, Anytown, USA 12345"
      /> */}
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX}
          initialViewState={{
            longitude: Coordinates.longitude || 73.8567, // Default longitude
            latitude: Coordinates.latitude || 18.5204, // Default latitude
            zoom: zoom,
          }}
          onMove={(evt) => {
            //   // const { longitude, latitude, zoom } = evt.viewState;
            //   // dispatch(
            //   //   UPDATE_COORDINATES({ longitude, latitude, change: false })
            //   // );
            //   // setZoom(zoom);
            handleMapMove(evt);
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {!loadingCafes &&
            nearbyCafes.map((cafe) => (
              <Marker
                key={cafe.place_id}
                longitude={cafe.geometry.lng}
                latitude={cafe.geometry.lat}
              >
                <div
                  onMouseEnter={() => setHoveredCafe(cafe.place_id)}
                  onMouseLeave={() => setHoveredCafe(null)}
                >
                  <div className="marker" />
                  <img
                    src={Cafe_Pin}
                    alt="Cafe Pin"
                    width="44"
                    height="44"
                    className="cursor-pointer"
                  />
                  
                  {hoveredCafe===cafe.place_id&&
                     <Popup
                    className="popup"
                    latitude={cafe.geometry.lat}
                    longitude={cafe.geometry.lng}
                    closeButton={false}
                    anchor="bottom"
                    style={{
                      display: "block",
                      borderRadius: "10px",
                      padding: "0px",
                    }}
                  >
                    <PlaceCard
                      imageSrc={cafe.photoReference || ""}
                      name={cafe.name}
                      rating={cafe.rating}
                      reviewCount={cafe.userRatingTotal}
                      isOpen={cafe.openNow || false}
                      address={cafe.vicinity}
                    />
                  </Popup> 
                  }
                  
                  
                </div>
              </Marker>
            ))}
        </Map>
      </div>
    </div>
  );
};

export default Home;

