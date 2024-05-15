/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  padding: 0.6rem;
  border: none;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  z-index: 3;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-grey-400);
    font-size: 2.6rem !important;

    &:hover {
      color: var(--color-grey-500);
    }
  }
`;

export default function Modal({ toggleModal, children }) {
  return createPortal(
    <Overlay>
      <StyledModal>
        <CloseButton onClick={toggleModal}>
          <HiXMark style={{ fontSize: "1.6rem" }} />
        </CloseButton>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
