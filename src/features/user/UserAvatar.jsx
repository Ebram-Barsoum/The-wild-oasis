/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import useCurrentUser from "../Authentication/useCurrentUser";

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;

  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  outline: 2px solid var(--color-grey-100);
`;

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Name = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
`;

export default function UserAvatar() {
  const { user } = useCurrentUser();
  const { avatar, fullName } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "/default-user.jpg"}
        alt={`Image of ${fullName}`}
      />
      <Name>{fullName}</Name>
    </StyledUserAvatar>
  );
}
