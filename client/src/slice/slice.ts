import { createSlice , PayloadAction} from "@reduxjs/toolkit";

type User = {
  name: string | null;
  IsLoginOpen: boolean;
};
const initialState: User = {
  name: null,
  IsLoginOpen: false,
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
   
  },
});
export const { UPDATEUSER ,SET_LOGIN_OPEN,SET_LOGIN_CLOSE} = UserSlice.actions;
export const userReducer=UserSlice.reducer;
export default UserSlice.reducer;
