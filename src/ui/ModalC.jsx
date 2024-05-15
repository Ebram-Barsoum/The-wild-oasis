/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(3px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5;
`;

const StyledModal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  position: relative;

  padding: 1.8rem 2.4rem;
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

// Compound component pattern

// 1- create context for shared state
export const ModalContext = createContext();

// 2- create parent component
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open: setOpenName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3- create children components
function Open({ children, name }) {
  const { open } = useContext(ModalContext);
  const handleClick = (e) => {
    e?.stopPropagation();
    open(name);
  };
  return cloneElement(children, { onClick: handleClick });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <CloseButton onClick={close}>
          <HiXMark />
        </CloseButton>
        <div>{cloneElement(children, { closeModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4- assign children components as properties of parent component
Modal.Open = Open;
Modal.Window = Window;
