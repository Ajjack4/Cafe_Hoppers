import Home from './pages/Home'
import 'mapbox-gl/dist/mapbox-gl.css';

// import {UPDATEUSER} from './slice/slice'
// import { useDispatch } from 'react-redux';
// import { RootState } from "./slice/stateStore";
// import {  useSelector } from "react-redux";
const App = () => {
  // const user = useSelector((state: RootState) => state.user);
  // const dispatch = useDispatch();
  // const handlesubmit=()=>{
   
  //   dispatch(UPDATEUSER({
  //     name:"test",
  //     Login:true,
  //   }))
  // }
  return (
    <div>
<Home/>
      
    
    </div>
  )
}

export default App
