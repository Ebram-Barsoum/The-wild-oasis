import styled from "styled-components";

import Header from "../../ui/Header";
import DashboardFilter from "./DashboardFilter";

const StyledDashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & {
    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 2.4rem;
    }
  }
`;

export default function DashboardHeader() {
  return (
    <StyledDashboardHeader>
      <Header as="h1">Dashboard</Header>
      <DashboardFilter />
    </StyledDashboardHeader>
  );
}
