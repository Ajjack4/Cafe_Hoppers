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
type Coordinates={
  longitude:number
  latitude:number
  change:boolean
}
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
export const CoordinatesService =createSlice({
  name: "coordinates",
  initialState: {
    longitude:73.8567,
    latitude:18.5204,
    change:false
  },
  reducers: {
    UPDATE_COORDINATES(state, action:PayloadAction<Coordinates>) {
      state.longitude=action.payload.longitude
      state.latitude=action.payload.latitude
      state.change=action.payload.change
      
    },
  },

})
export const { UPDATEUSER ,SET_LOGIN_OPEN,SET_LOGIN_CLOSE,UPDATE_ALERT,START_LOADING,END_LOADING} = UserSlice.actions;
export const {UPDATE_COORDINATES}=CoordinatesService.actions
export const userReducer=UserSlice.reducer;
export const CoordinatesReducer=CoordinatesService.reducer
export default UserSlice.reducer;
