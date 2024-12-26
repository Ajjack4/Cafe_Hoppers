import Login from "../components/User/Login";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import Map, { Marker } from "react-map-gl";
import { useState } from "react";
// import Pin from "@mui/icons-material/LocationOnOutlined";

const Home = () => {
  const [viewState, setViewState] = useState({
    longitude: 73.8567,
    latitude: 18.5204,
    zoom: 11.5,
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <div className="h-full w-full">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={73} latitude={18}>
            <div>hello</div>
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default Home;
