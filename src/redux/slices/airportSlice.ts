import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { Airport } from "../../types/Types";
import { BASE_URI} from "../../constants";

const initialState : {airports:Airport[] | [],loading:boolean} = {
  airports: [],
  loading: false,
};

export const getAirports = createAsyncThunk(
  "booking/getAirports",
  async () => {
    return fetch(`${BASE_URI}airports`)
      .then((res:any) => res.json())
      .then((data:any) => data);
  }
);

export const airportSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAirports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAirports.fulfilled, (state, action) => {
        state.loading = false;
        state.airports = action.payload;
      })
      .addCase(getAirports.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const airportReducer = airportSlice.reducer;
