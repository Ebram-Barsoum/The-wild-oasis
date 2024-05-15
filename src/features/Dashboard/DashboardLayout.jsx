import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useGetCabins from "../cabins/useGetCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import StaysChart from "./StaysChart";
import TodayActivities from "../check-in-out/TodayActivities";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.6fr;
  gap: 2.4rem;

  & {
    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
    }
  }
`;

export default function DashboardLayout() {
  const { recentBookings, isLoading: isLoading1 } = useRecentBookings();

  const { isLoading: isLoading2, confirmedStays, duration } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useGetCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        duration={duration}
        numCabins={cabins?.length}
      ></Stats>
      <Box>
        <TodayActivities />
        <StaysChart confirmedStays={confirmedStays} />
      </Box>
      <SalesChart bookings={recentBookings} numOfDays={duration} />
    </StyledDashboardLayout>
  );
}
