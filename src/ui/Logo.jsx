import styled from "styled-components";
import { useDarkMode } from "../Contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export default function Logo() {
  const { mode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        src={`/logo-${mode === "light" ? "light" : "dark"}.png`}
        alt="hotel in the wild image logo"
      />
    </StyledLogo>
  );
}
