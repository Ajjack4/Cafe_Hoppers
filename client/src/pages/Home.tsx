

import Login from '../components/User/Login'
import Navbar from '../components/Navbar'
import Notification from '../components/Notification'
import Loading from '../components/Loading'

const Home = () => {
  return (
    <>
      <Loading/>
      <Notification/>
      <Navbar/>
      <Login/>
    </>
  )
}

export default Home
