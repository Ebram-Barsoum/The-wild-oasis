/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  return (
    <MenusContext.Provider value={{ openId, setOpenId, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, setOpenId, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === id && openId !== "") {
      setOpenId("");
    } else {
      setOpenId(id);
    }
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function List({ children, id }) {
  const { openId, position, setOpenId } = useContext(MenusContext);

  const ref = useOutsideClick(() => setOpenId(""));

  if (openId !== id) return;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Option({ children, onClick, disabled }) {
  const { setOpenId } = useContext(MenusContext);
  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.();
    setOpenId("");
  };

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Option = Option;
