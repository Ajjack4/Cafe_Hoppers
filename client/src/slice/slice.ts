import { createSlice , PayloadAction} from "@reduxjs/toolkit";


type alerttype={
  open:boolean,
  severity: 'error' | 'warning' | 'info' | 'success'; 
  message:string;
}
type User = {
  name: string | null;
  IsLoginOpen: boolean;
  Loading: boolean;
  alert:alerttype
};
const initialState: User = {
  name: null,
  IsLoginOpen: false,
  Loading: false,
  alert:{
    open:false,
    severity:'info',
    message:''
  }
};
export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    UPDATEUSER(state, action:PayloadAction<User>) {
      state.name=action.payload.name
    },
    SET_LOGIN_OPEN(state) {
      state.IsLoginOpen=true
    },
    SET_LOGIN_CLOSE(state){
      state.IsLoginOpen=false
    },
    UPDATE_ALERT(state,action:PayloadAction<User>){
      state.alert=action.payload.alert
    },
    START_LOADING(state) {
      state.Loading=true
    },
    END_LOADING(state){
      state.Loading=false
    },
   
  },
});
export const { UPDATEUSER ,SET_LOGIN_OPEN,SET_LOGIN_CLOSE,UPDATE_ALERT,START_LOADING,END_LOADING} = UserSlice.actions;
export const userReducer=UserSlice.reducer;
export default UserSlice.reducer;
