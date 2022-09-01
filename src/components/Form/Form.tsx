import React, { useEffect, useState } from "react";
import Button from "../common/Button/Button";
import { Container } from "../common/Container/Container";
import styles from "./Form.module.scss";
import { formatDate } from "../../Utils/dateFormater";
import { useSelector, useDispatch } from "react-redux";
import {
  submitBooking,
  getAllBookings,
  resetPage,
} from "../../redux/slices/bookingSlice";
import { getAirports } from "../../redux/slices/airportSlice";
import { validateFromData } from "../../Utils/validateFormData";
import {
  Booking,
  BookingState,
  AirportState,
  Airport,
} from "../../types/Types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
type FormProps = {};

const Form: React.FC<FormProps> = () => {
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [departureAirport, setDepartureAirport] = useState<string>("");
  const [destinationAirport, setDestinationAirport] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const { status, pageNumber } = useSelector(
    (state: BookingState) => state.booking
  );
  const { airports } = useSelector((state: AirportState) => state.airport);

  useEffect(() => {
    dispatch(getAirports());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [visible]);

  const clearForm = () => {
    setfirstName("");
    setLastName("");
    setDepartureAirport("");
    setDestinationAirport("");
    setDepartureDate("");
    setReturnDate("");
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    const bookingData: Booking = {
      firstName,
      lastName,
      departureAirportId: departureAirport,
      arrivalAirportId: destinationAirport,
      departureDate: formatDate(departureDate).toString(),
      returnDate: formatDate(returnDate).toString(),
    };

    if (validateFromData(bookingData)) {
      dispatch(submitBooking(bookingData)).then(() => {
        dispatch(resetPage());
        dispatch(getAllBookings(pageNumber));
        setVisible(true);
      });
      clearForm();
    } else {
      alert("Something went wrong...");
    }
  };

  const Airports = () => {
    return (
      <>
        {airports.map(({ id, title, code }: Airport) => {
          return <option key={id} value={id}>{`${title} - ${code}`}</option>;
        })}
      </>
    );
  };

  return (
    <Container title="Book a flight">
      <form className={styles.form} onSubmit={(event) => onSubmit(event)}>
        <div className={styles.form__row}>
          <input
            type="text"
            name="firstName"
            id=""
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setfirstName(event.target.value)}
          />
          <input
            type="text"
            name="lastName"
            id=""
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className={styles.form__row}>
          <select
            name="departure"
            id="departure"
            value={departureAirport}
            onChange={(event) => setDepartureAirport(event.target.value)}
          >
            <option value="" hidden>
              {airports.length ? "Select your option" : "Loading..."}
            </option>
            {<Airports />}
          </select>
          <select
            name="destination"
            id="destination"
            value={destinationAirport}
            onChange={(event) => setDestinationAirport(event.target.value)}
          >
            <option value="" hidden>
              {airports.length ? "Select your option" : "Loading..."}
            </option>
            {<Airports />}
          </select>
          <input
            type="date"
            name="depDate"
            id=""
            onChange={(event) => setDepartureDate(event.target.value)}
            value={departureDate}
          />
          <input
            type="date"
            name="arrDate"
            id=""
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
          />
        </div>
        <Button icon={faSearch} name="Book" type="submit" />
        {status === "pending" ? (
          <div className={[styles.notification, styles.loading].join(" ")}>
            Loading...
          </div>
        ) : null}
        {status === "fulfilled" && visible ? (
          <div className={[styles.notification, styles.success].join(" ")}>
            Success!
          </div>
        ) : null}
        {status === "rejected" && visible ? (
          <div className={[styles.notification, styles.error].join(" ")}>
            Something went wrong!
          </div>
        ) : null}
      </form>
    </Container>
  );
};

export default Form;
