import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Map from "react-map-gl";
import { useState} from "react";
import { UPDATE_COORDINATES } from "../slice/slice";
import { RootState } from "@/slice/stateStore";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const Coordinates = useSelector((state: RootState) => state.coordinates);
  const [zoom,setZoom]=useState(11.5)
  // useEffect(() => {
  //   console.log("Coordinates updated", Coordinates);
  // }, [Coordinates]);
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <div className="relative h-full w-full z-10">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX}
          longitude={Coordinates.longitude}
          latitude={Coordinates.latitude}
          zoom={zoom}
          onMove={(evt) => {
            const { longitude, latitude, zoom } = evt.viewState;
            dispatch(
              UPDATE_COORDINATES({ longitude, latitude, change: false })
            );
            setZoom(zoom);
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
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
