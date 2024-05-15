import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 2.4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      max-width: 100rem;
      padding: 3.2rem 2.4rem 1.2rem;

      & {
        @media (max-width: 992px) {
          font-size: 1.2rem;
          width: 80dvw;
          max-height: 90dvh !important;
          overflow: auto !important;
        }
      }
    `}

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};
export default Form;
