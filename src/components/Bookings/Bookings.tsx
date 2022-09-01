import React, { useEffect, useState, useRef } from "react";
import { Container } from "../common/Container/Container";
import styles from "./Bookings.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBookings,
  deleteBooking,
  setPage,
  resetPage,
} from "../../redux/slices/bookingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import {
  BookingItem,
  Airport,
  AirportState,
  BookingState,
} from "../../types/Types";

type BookingProps = {};

const Bookings: React.FC<BookingProps> = () => {
  const dispatch = useDispatch<any>();
  const { bookings, totalCount, pageNumber } = useSelector(
    (state: BookingState) => state.booking
  );
  const { airports } = useSelector((state: AirportState) => state.airport);
  const listInnerRef = useRef<any>();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        totalCount !== bookings.length
      ) {
        dispatch(setPage());
      }
    }
  };

  const noMoreResultsLeft =
    Number(totalCount) === Number(bookings.length) && totalCount !== null;

  useEffect(() => {
    if (noMoreResultsLeft) return;
    dispatch(getAllBookings(pageNumber));
  }, [pageNumber]);

  const onDeleteBooking = (bookingNumber: number) => {
    dispatch(deleteBooking(bookingNumber)).then(() => {
      dispatch(resetPage());
      dispatch(getAllBookings(pageNumber));
    });
  };

  const BookingList = () => {
    if (bookings.length) {
      return (
        <>
          {bookings.map(
            ({
              id,
              departureAirportId,
              arrivalAirportId,
              firstName,
              lastName,
            }: BookingItem) => {
              const departureAirport = airports.find(
                (x: Airport) => x.id === departureAirportId
              );
              const arrivalAirport = airports.find(
                (x: Airport) => x.id === arrivalAirportId
              );
              return (
                <div key={id} className={styles.booking}>
                  <div>
                    <FontAwesomeIcon icon={faPassport} />
                    <span>{id}</span>
                  </div>
                  <div>
                    <span className={styles.first__name}>{firstName}</span>
                  </div>
                  <div>
                    <span className={styles.last__name}>{lastName}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPlaneDeparture} />
                    <span>{departureAirport.code}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPlaneArrival} />
                    <span>{arrivalAirport.code}</span>
                  </div>
                  <span
                    className={styles.delete}
                    onClick={() => onDeleteBooking(id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              );
            }
          )}
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <Container
      title={`Showing ${bookings.length} out of ${totalCount} Existing Bookings`}
    >
      <div
        className={styles.booking__container}
        onScroll={onScroll}
        ref={listInnerRef}
      >
        <BookingList />
      </div>
    </Container>
  );
};

export default Bookings;
