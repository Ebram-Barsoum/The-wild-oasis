import styled, { css } from "styled-components";
const Row = styled.div`
  display: flex;
  ${(props) =>
    props.direction === "horizontal" &&
    css`
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    `}

  ${(props) =>
    props.direction === "vertical" &&
    css`
      flex-direction: column;
      gap: 0.6rem;
    `}
`;

Row.defaultProps = {
  direction: "horizontal",
};

export default Row;
