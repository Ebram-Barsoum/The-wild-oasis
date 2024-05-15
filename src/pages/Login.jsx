import styled from "styled-components";
import LoginForm from "../features/Authentication/LoginForm";
import Logo from "../ui/Logo";
import Header from "../ui/Header";

const StyledLogin = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  background-color: var(--color-grey-50);
`;

export default function Login() {
  return (
    <StyledLogin>
      <Logo />
      <Header as="h1">Login to your account</Header>
      <LoginForm />
    </StyledLogin>
  );
}
