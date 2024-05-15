import styled, { css } from "styled-components";

const Header = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      & {
        @media (max-width: 768px) {
          font-size: 2.4rem;
        }
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5;
      font-weight: 600;

      & {
        @media (max-width: 768px) {
          font-size: 1.9rem;
        }
      }
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;

      & {
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }
    `}
`;

export default Header;
