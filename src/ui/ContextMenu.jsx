import styled from "styled-components";

const ContextMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
  overflow: hidden;

  width: 15rem;
  position: absolute;
  top: 100%;
  right: 100%;

  & li:hover {
    transition: all 0.3s;
    background-color: var(--color-grey-100);
  }
`;

export default ContextMenu;
