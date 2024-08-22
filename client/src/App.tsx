// import Home from './pages/Home'

import {UPDATEUSER} from './slice/slice'
import { useDispatch } from 'react-redux';
import { RootState } from "./slice/stateStore";
import {  useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handlesubmit=()=>{
   
    dispatch(UPDATEUSER({
      name:"test",
      Login:true,
    }))
  }
  return (
    <div>
{/* <Home/> */}
      <button onClick={handlesubmit}>Login</button>
      <h1>User{user.name}</h1>
    
    </div>
  )
}

export default App
