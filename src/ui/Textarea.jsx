import styled from "styled-components";

const Textarea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow-sm);

  padding: 0.8rem 1.2rem;
  max-width: 100%;
  max-height: 12rem;
  min-height: 12rem;

  & {
    @media (max-width: 992px) {
      width: 100%;
    }
  }
`;

export default Textarea;
