/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineHomeModern } from "react-icons/hi2";
import useScreenWidth from "../hooks/useScreenWidth";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    font-size: 1.6rem;
    color: var(--color-grey-500);
    padding: 1.2rem 1.4rem;

    font-weight: 500;
    transition: all 0.3s;
  }

  &.active,
  &:hover {
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  }

  & svg {
    font-size: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-700);
  }
`;

export default function MainNav({ open }) {
  const width = useScreenWidth();

  return (
    <NavList>
      <li>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          {width >= 1200 && <span>Home</span>}
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/bookings">
          <HiOutlineCalendarDays />
          {width >= 1200 && <span>Bookings</span>}
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/cabins">
          <HiOutlineHomeModern />
          {width >= 1200 && <span>Cabins</span>}
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/users">
          <HiOutlineUserGroup />
          {width >= 1200 && <span>Users</span>}
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/settings">
          <HiOutlineCog />
          {width >= 1200 && <span>Settings</span>}
        </StyledNavLink>
      </li>
    </NavList>
  );
}
