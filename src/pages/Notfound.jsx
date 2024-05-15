import styled from "styled-components";
import useMoveBack from "../hooks/useMoveBack";

import img from "../../public/not-found.png";
import Button from "../ui/Button";

const StyledNotfound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  height: 100dvh;
  width: 100%;
`;

const Img = styled.img`
  width: 60rem;
`;

export default function Notfound() {
  const { moveBack } = useMoveBack();
  return (
    <StyledNotfound>
      <Img src={img} alt="image of 404 error not found" />
      <div>
        <Button variation="secondary" onClick={moveBack}>
          &larr; Go Back
        </Button>
      </div>
    </StyledNotfound>
  );
}
