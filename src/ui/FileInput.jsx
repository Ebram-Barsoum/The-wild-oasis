import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    background-color: var(--color-brand-600);
    color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);

    font: inherit;
    border: none;
    padding: 1.2rem 1.6rem;
    margin-right: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
