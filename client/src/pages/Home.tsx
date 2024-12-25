

import Login from '../components/User/Login'
import Navbar from '../components/Navbar'
import Notification from '../components/Notification'
import Loading from '../components/Loading'
import Map from 'react-map-gl';

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <div className="h-full w-full">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX}
          initialViewState={{
            longitude: 73.8567,
            latitude: 18.5204,
            zoom: 11.5,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>
    </div>
  )
}

export default Home
