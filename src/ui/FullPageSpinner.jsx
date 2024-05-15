import styled from "styled-components";
import Spinner from "./Spinner";

const StyledFullPageSpinner = styled.div`
  height: 100dvh;
  width: 100dvw;

  display: grid;
  place-items: center;

  background-color: var(--color-grey-50);
`;

export default function FullPageSpinner() {
  return (
    <StyledFullPageSpinner>
      <Spinner />
    </StyledFullPageSpinner>
  );
}
