
import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { CoordinatesReducer, userReducer } from "./slice";

const rootReducer = combineReducers({
  user: userReducer,
  coordinates: CoordinatesReducer

 // other reducers here if needed...
})
export const store = () => {
  return configureStore({
      reducer: rootReducer,
  });
}
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']