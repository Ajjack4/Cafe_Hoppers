// import { useValue } from '../context/ContextProvider'
import icon from '../../assets/react.svg'
import {UPDATEUSER} from '../../slice/slice'
import { useDispatch } from 'react-redux';
import { RootState } from "../../slice/stateStore";
import {  useSelector } from "react-redux";
const Usericon = () => {
    // const {state:{currentUser}} = useValue();
    // const { dispatch } = useValue();
const dispatch=useDispatch();
const user = useSelector((state: RootState) => state.user);
  const handlesubmit=()=>{
   
    dispatch(UPDATEUSER({
      name:null,
      IsLoginOpen:user.IsLoginOpen,
    }))
    console.log(user)
  }

  return (
    <div className='flex flex-row justify-center items-center'>
      <img src={icon}/>
      <div className='pl-2' onClick={handlesubmit}>
        {user.name}
      </div>
         
    </div>
  )
}

export default Usericon
