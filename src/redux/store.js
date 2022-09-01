import { configureStore } from "@reduxjs/toolkit";
import {bookingReducer} from "./slices/bookingSlice";
import {airportReducer} from "./slices/airportSlice";
export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    airport: airportReducer,
  },
});
