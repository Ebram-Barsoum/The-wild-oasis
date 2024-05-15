/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { Uploader } from "../data/Uploader";
import useScreenWidth from "../hooks/useScreenWidth";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.6rem 2.6rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 2.6rem;

  width: 26rem;
  max-height: 100dvh;
  transition: all 0.3s;

  ${(props) =>
    props.width < 1200 &&
    css`
      width: auto;

      padding: 3.6rem 0.6rem;

      justify-content: center;
    `}
`;

export default function Sidebar() {
  const width = useScreenWidth();
  return (
    <StyledSidebar width={width}>
      {width >= 1200 && <Logo />}
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}
