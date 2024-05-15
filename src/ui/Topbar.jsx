import styled from "styled-components";

import Logout from "../features/Authentication/Logout";
import User from "../features/user/User";
import UserAvatar from "../features/user/UserAvatar";
import ModeToggler from "./ModeToggler";

const StyledTopbar = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.4rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1.6rem;

  position: sticky;
  top: 0;
  left: 26rem;
`;

export default function Topbar() {
  return (
    <StyledTopbar>
      <UserAvatar />
      <User />
      <ModeToggler />
      <Logout />
    </StyledTopbar>
  );
}
