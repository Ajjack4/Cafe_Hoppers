import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import { UPDATE_COORDINATES } from "../slice/slice";
import { RootState } from "@/slice/stateStore";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyCafes } from "../api/GetNeaby-cafes";
import PlaceCard from "../components/ui/place-card";

type Cafe = {
  place_id: string; // Corresponds to `place_id`
  name: string; // Corresponds to `name`
  vicinity: string; // Corresponds to `vicinity`
  rating: number; // Corresponds to `rating`
  userRatingTotal: number; // Corresponds to `user_ratings_total`
  openNow: boolean | null; // Corresponds to `opening_hours.open_now` (nullable if opening_hours is absent)
  photoReference: string | null; // Corresponds to `photos[0]?.photo_reference` (nullable if no photos are available)
  geometry:Geometry
};
type Geometry={
  
    lat: number;
    lng: number;
  
}

const Home = () => {
  const dispatch = useDispatch();
  const Coordinates = useSelector((state: RootState) => state.coordinates);
  const [zoom, setZoom] = useState(14);
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]);
  const [loadingCafes, setLoadingCafes] = useState(true);
  const debounceTimer=useRef<NodeJS.Timeout | null>(null)
 

  const handleMapMove=(evt: ViewStateChangeEvent)=>{
         const { longitude, latitude, zoom } = evt.viewState;
            dispatch(
              UPDATE_COORDINATES({ longitude, latitude, change: false })
            );
            setZoom(zoom);
        if (debounceTimer.current){
          clearTimeout(debounceTimer.current);
        }
        debounceTimer.current=setTimeout(()=>{
            fetchCafes();
        },1500)
  }
  const fetchCafes = async () => {
    try {
      setLoadingCafes(true);

      const cafes:Cafe[] = await getNearbyCafes(Coordinates.longitude, Coordinates.latitude);
      const uniqueCafes:Cafe[] =[]
      cafes.forEach((cafe:Cafe)=>{
        if(!nearbyCafes.includes(cafe)){
          uniqueCafes.push(cafe);
        }
      })

      setNearbyCafes([...nearbyCafes,...uniqueCafes]);
      console.log("cafes:",nearbyCafes)
    } catch (error) {
      console.error("Error fetching nearby cafes:", error);
    } finally {
      setLoadingCafes(false);
    }
  };

  // Fetch nearby cafes when coordinates change
  useEffect(() => {
    
 return ()=>{
    fetchCafes()
     if (debounceTimer.current){
       clearTimeout(debounceTimer.current);
     }
  
 }
    
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
          onMove={
            (evt) => {
          //   // const { longitude, latitude, zoom } = evt.viewState;
          //   // dispatch(
          //   //   UPDATE_COORDINATES({ longitude, latitude, change: false })
          //   // );
          //   // setZoom(zoom);
          handleMapMove(evt)
          }
          }
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {!loadingCafes &&
            nearbyCafes.map((cafe) => (
              <Marker
                key={cafe.place_id}
                longitude={cafe.geometry.lng}
                latitude={cafe.geometry.lat}
              >
                <div>Cafe: {cafe.name}</div>
              </Marker>
            ))}
        </Map>
      </div>
    </div>
  );
};

export default Home;



  {/* <Marker longitude={73.8567} latitude={18.5204}>
            <Pin
              style={{
                fontSize: viewState.zoom * 2,
                color: "tomato",
                cursor: "pointer",
              }}
            />
          </Marker>
          <Popup
            latitude={18.5204}
            longitude={73.8567}
            closeButton={false}
            anchor="bottom"
            style={{ borderRadius: "10px", padding: "0px" }}
            className="p-0"
          >
            <div className="bg-white rounded-2xl text-gray-700 space-y-4 cursor-pointer">
              <div className="p-2 text-gray-700 space-y-2">
                <div>
                  <div className="border border-gray-300 rounded-lg p-2 text-center text-gray-500">
                    No photos found
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Place Name
                  </h4>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <StarIcon className="text-yellow-500" />
                  <StarIcon className="text-yellow-500" />
                  <StarIcon className="text-yellow-500" />
                  <StarIcon className="text-yellow-500" />
                  <StarHalfIcon className="text-yellow-500" />
                </div>
                <div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">
                    View Seeks
                  </button>
                </div>
              </div>
            </div>
          </Popup> */}
