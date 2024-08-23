import { Snackbar, Alert } from "@mui/material"

import {UPDATE_ALERT} from '../slice/slice'
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from "../slice/stateStore";

const Notification = () => {
    const dispatch=useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const handleClose=(event: React.SyntheticEvent | Event, reason?: string)=>{
    if(reason === 'clickaway')return
    dispatch(UPDATE_ALERT({
        ...user,  // Spread the entire `user` state
      alert: {
          // Spread the existing alert properties
        open: false, 
        severity:"info",
        message:''   // Only update `open` to false
      },
    }))
    }
  return (
    <Snackbar
    open={user.alert.open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{vertical:'top',horizontal:'center'}}
    >
         <Alert
         onClose={handleClose}
         severity={user.alert.severity || "info"}
         sx={{width:'100%'}}
         variant="filled"
         elevation={6}
         >
            {user.alert.message}
         </Alert>
    </Snackbar>
  )
}

export default Notification
