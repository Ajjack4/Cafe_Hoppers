import { Backdrop,CircularProgress } from "@mui/material"

import { useSelector } from 'react-redux';
import { RootState } from "../slice/stateStore";

const Loading = () => {

    const user = useSelector((state: RootState) => state.user);

  return (
    <Backdrop open={user.Loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
    <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  )
}

export default Loading
