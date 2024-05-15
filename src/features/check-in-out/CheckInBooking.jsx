import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helper";
import useGetBooking from "../Bookings/useGetBooking";
import useMoveBack from "../../hooks/useMoveBack";
import useGetSettings from "../settings/useGetSettings";
import useCheckIn from "./useCheckIn";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Header from "../../ui/Header";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/CheckBox";
import BookingData from "../Bookings/BookingData";
import Box from "../../ui/Box";

function CheckinBooking() {
  const [confirmPaied, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isLoading } = useGetBooking();
  const { isLoading: isLoadingSettings, settings } = useGetSettings();
  const { moveBack } = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * settings.breakfastPrice * numGuests;

  function handleCheckIn() {
    if (addBreakfast) {
      const breakfast = {
        hasBreakfast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      };

      checkIn({ bookingId, breakfast });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Header as="h1">Check in booking #{bookingId}</Header>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingData booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            disabled={isCheckingIn}
            checked={addBreakfast}
            onChange={(e) => {
              setAddBreakfast(e.target.checked);
              setConfirmPaid(false);
            }}
            id={"addBreakfast"}
          >
            Want to add breakfast for ${optionalBreakfastPrice}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaied}
          onChange={(e) => setConfirmPaid(e.target.checked)}
          id="confirm"
          disabled={confirmPaied || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast ? (
            formatCurrency(totalPrice)
          ) : (
            <>
              {formatCurrency(totalPrice + optionalBreakfastPrice)}(
              {formatCurrency(totalPrice)} +
              {formatCurrency(optionalBreakfastPrice)} )
            </>
          )}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPaied || isCheckingIn}
          onClick={handleCheckIn}
        >
          Check in booking #{bookingId}
        </Button>

        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
