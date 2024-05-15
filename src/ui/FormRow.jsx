import styled from "styled-components";

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 1.2rem;

  position: relative;
  padding: 1.4rem 2.6rem;

  &:not(:has(textarea)) {
    align-items: center;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: end;
    gap: 1.2rem;
  }

  &:not(:has(button)) {
    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 1.2rem;

      align-items: start;
    }
  }
`;

export default FormRow;
