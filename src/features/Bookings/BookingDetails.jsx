import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useMoveBack from "../../hooks/useMoveBack";
import useGetBooking from "./useGetBooking";
import useCheckOut from "../check-in-out/uceCheckOut";

import Row from "../../ui/Row";
import Header from "../../ui/Header";
import Tag from "../../ui/Tag";
import statusToTagName from "./BookingStatus";
import TextButton from "../../ui/TextButton";
import Spinner from "../../ui/Spinner";
import BookingData from "./BookingData";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ModalC from "../../ui/ModalC";

import useDeleteBooking from "./useDeleteBooking";
import DeletePopup from "../../ui/DeletePopup";
import EmptyMessage from "../../ui/EmptyMessage";

const StyledRow = styled(Row)`
  gap: 2.4rem;
`;

export default function BookingDetails() {
  const { moveBack } = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();

  const { data: booking, isLoading } = useGetBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <EmptyMessage resourceName={"booking"} />;

  const handleDeleteBooking = () => {
    deleteBooking(booking.id);
  };

  return (
    <>
      <Row>
        <StyledRow>
          <Header as="h1">Booking #{booking.id}</Header>
          <Tag type={statusToTagName[booking.status]}>{booking.status}</Tag>
        </StyledRow>

        <TextButton onClick={moveBack}>&larr; Back</TextButton>
      </Row>

      <BookingData booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check-in/${booking.id}`)}>
            Check in
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button
            onClick={() => checkOut(booking.id)}
            disabled={isCheckingOut || isDeletingBooking}
          >
            Check Out
          </Button>
        )}

        <ModalC>
          <ModalC.Open name="delete-booking">
            <Button
              variation="danger"
              onClick={handleDeleteBooking}
              disabled={isCheckingOut || isDeletingBooking}
            >
              Delete Booking
            </Button>
          </ModalC.Open>

          <ModalC.Window name={"delete-booking"}>
            <DeletePopup
              resource={"Booking"}
              id={booking.id}
              disable={isDeletingBooking}
              onConfirm={() => deleteBooking(booking.id)}
            />
          </ModalC.Window>
        </ModalC>

        <Button
          variation="secondary"
          onClick={moveBack}
          disabled={isCheckingOut || isDeletingBooking}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
