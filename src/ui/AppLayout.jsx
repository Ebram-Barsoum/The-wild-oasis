import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const StyledAppLayout = styled.main`
  /* display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr; */

  display: flex;
  height: 100vh;
`;

const Section = styled.section`
  background-color: var(--color-grey-50);
  padding: 3.4rem 4.6rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  overflow: auto;
`;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />

      <Main>
        <Topbar />
        <Section>
          <Container>
            <Outlet />
          </Container>
        </Section>
      </Main>
    </StyledAppLayout>
  );
}
