/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helper";
import styled from "styled-components";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;

  & {
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  & {
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function Stats({
  bookings,
  confirmedStays,
  duration,
  numCabins,
}) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce(
    (total, booking) => (total += booking.totalPrice),
    0
  );
  const checkIns = confirmedStays.length;

  const occupation =
    (
      (confirmedStays.reduce((total, stay) => (total += stay.numNights), 0) /
        (duration * numCabins)) *
      100
    ).toFixed(2) + "%";

  // occupation = num of checked in nights / num of cabins * num of days filter based on
  return (
    <StyledStats>
      <Stat
        title={"Bookings"}
        value={numOfBookings}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
      ></Stat>

      <Stat
        title={"Sales"}
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color={"green"}
      ></Stat>
      <Stat
        title={"Checkins"}
        value={checkIns}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
      ></Stat>

      <Stat
        title={"Occupancy rate"}
        value={occupation}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
      ></Stat>
    </StyledStats>
  );
}
