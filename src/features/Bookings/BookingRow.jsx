/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { isToday } from "date-fns/isToday";
import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import useCheckOut from "../check-in-out/uceCheckOut";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helper";
import statusToTagName from "./BookingStatus";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import ModalC from "../../ui/ModalC";
import DeletePopup from "../../ui/DeletePopup";

import useDeleteBooking from "./useDeleteBooking";
import useOutsideClick from "../../hooks/useOutsideClick";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-gray-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export default function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    status,
    totalPrice,
    cabins: { name: cabinName },
    guests: { fullName: guestName, email: guestEmail },
  },
}) {
  const navigate = useNavigate();
  const { checkOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stack>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stack>

      <Stack>
        <span>
          {isToday(startDate) ? "Today" : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stack>

      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <ModalC>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Option onClick={() => navigate(`/bookings/${bookingId}`)}>
              <HiEye />
              Show Details
            </Menus.Option>

            {status === "unconfirmed" && (
              <>
                <Menus.Option
                  onClick={() => navigate(`/check-in/${bookingId}`)}
                >
                  <HiArrowDownOnSquare />
                  Check-in
                </Menus.Option>
              </>
            )}

            {status === "checked-in" && (
              <Menus.Option onClick={() => checkOut(bookingId)}>
                <HiArrowUpOnSquare />
                Check Out
              </Menus.Option>
            )}

            <ModalC.Open name="delete-booking">
              <Menus.Option>
                <HiTrash />
                Delete booking
              </Menus.Option>
            </ModalC.Open>
          </Menus.List>
        </Menus.Menu>

        <ModalC.Window name="delete-booking">
          <DeletePopup
            resource={"Booking"}
            id={bookingId}
            disable={isDeletingBooking}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </ModalC.Window>
      </ModalC>
    </Table.Row>
  );
}
