type FormData = {
  firstName: string;
  lastName: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureDate: string;
  returnDate: string;
};

export const validateFromData = ({
  firstName,
  lastName,
  departureAirportId,
  arrivalAirportId,
  departureDate,
  returnDate,
}: FormData) => {

  if (!firstName.length) {
    alert("no first name");
    return false;
  }
  if (!lastName.length) {
    alert("no last name");
    return false;
  }
  if(!departureAirportId || !arrivalAirportId){
    alert('please select propper airports')
    return false;
  }
  if(!departureDate || !returnDate){
    alert('please select propper dates')
    return false;
  }
  return true;
};
