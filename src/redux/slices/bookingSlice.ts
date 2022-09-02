import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { State } from "../../types/Types";
import { Booking } from "../../types/Types";
import { BASE_URI, TOKEN, PAGE_SIZE } from "../../constants";
const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

const initialState: State = {
  pageNumber: 0,
  status: "",
  bookings: [],
  totalCount: null,
};

const tokenP = {
  authToken: TOKEN,
};

const tokenParams = new URLSearchParams(tokenP);

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (data: Booking) => {
    return fetch(`${BASE_URI}bookings/create?` + tokenParams, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      mode: "cors",
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (pageNumber: number) => {
    const getBookingsP = {
      authToken: TOKEN,
      pageIndex: pageNumber.toString(),
      pageSize: PAGE_SIZE.toString(),
    };

    const bookingsParams = new URLSearchParams(getBookingsP);
    return fetch(`${BASE_URI}bookings?` + bookingsParams, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (BOOKING_NUMBER: number) => {
    return fetch(
      `${BASE_URI}bookings/delete/${BOOKING_NUMBER}?` + tokenParams,
      {
        method: "DELETE",
        headers,
      }
    )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPage(state) {
      state.pageNumber++;
    },
    resetPage(state) {
      state.pageNumber = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.status = "pending";
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.status = "fulfilled";
        state.bookings = [];
      })
      .addCase(submitBooking.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.bookings.push(...action.payload.list);
        state.totalCount = action.payload.totalCount;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.bookings = [];
      });
  },
});
export const bookingReducer = bookingSlice.reducer;
export const { setPage, resetPage } = bookingSlice.actions;
