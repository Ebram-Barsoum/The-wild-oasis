import styled from "styled-components";
import useTodayActivities from "./useTodayActivities";

import Header from "../../ui/Header";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import TodayItem from "./TodayItem";

const StyledTodayActivities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);

  padding: 1.6rem 2.4rem;
  flex-basis: 1;
`;

const TodayList = styled.ul`
  overflow: auto;
  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

export default function TodayActivities() {
  const { todayActivities, isLoading } = useTodayActivities();

  return (
    <StyledTodayActivities>
      <Row>
        <Header as="h3">Today&#39;s Activities</Header>
      </Row>

      {isLoading && <Spinner />}
      {!isLoading && todayActivities.length === 0 && (
        <NoActivity>No Activity Today...! 🧐</NoActivity>
      )}

      {!isLoading && todayActivities.length > 0 && (
        <TodayList>
          {todayActivities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      )}
    </StyledTodayActivities>
  );
}
