export type Booking = {
  firstName: string;
  lastName: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureDate: string;
  returnDate: string;
};

export type BookingItem = {
  arrivalAirportId: number;
  departureAirportId: number;
  departureDate: string;
  firstName: string;
  id: number;
  lastName: string;
  returnDate: string;
};

export type BookingState = {
  booking: {
    pageNumber:number;
    status: string;
    bookings: any[];
    totalCount: number;
  };
};

export type AirportState = {
  airport: {
    airports: Airport[] | any[];
    loading: boolean;
  };
};

export type State = {
  pageNumber:number;
  status: string;
  bookings: any[];
  totalCount: number | null;
};

export type Airport = {
  code: string;
  id: number;
  title: string;
};
