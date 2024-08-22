import { createSlice , PayloadAction} from "@reduxjs/toolkit";

type User = {
  name: string | null;
  Login: boolean;
};
const initialState: User = {
  name: null,
  Login: false,
};
export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    UPDATEUSER(state, action:PayloadAction<User>) {
      state.name=action.payload.name
    },
   
  },
});
export const { UPDATEUSER } = UserSlice.actions;
export const userReducer=UserSlice.reducer;
export default UserSlice.reducer;
