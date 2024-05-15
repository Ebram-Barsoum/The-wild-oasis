/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCheckOut from "../check-in-out/uceCheckOut";

import statusToTagName from "../Bookings/BookingStatus";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import Flag from "../../ui/Flag";

const StyledTodayItem = styled.div`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  align-items: center;
  gap: 1.2rem;

  padding: 1.2rem 0.6rem;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const {
    id,
    status,
    guests: { fullName, nationality, countryFlag },
    numNights,
  } = activity;
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const to = status === "unconfirmed" ? "check-in" : "check-out";

  const handleButtonClick = () => {
    if (status === "unconfirmed") {
      navigate(`/${to}/${id}`);
    } else {
      checkOut(id);
    }
  };

  return (
    <StyledTodayItem>
      <Tag type={statusToTagName[status]}>
        {status === "checked-in" ? "departing" : "arrival"}
      </Tag>
      <Flag src={countryFlag} alt={`The flag of ${nationality}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>
      <Button size="small" onClick={handleButtonClick} disabled={isCheckingOut}>
        {to}
      </Button>
    </StyledTodayItem>
  );
}
