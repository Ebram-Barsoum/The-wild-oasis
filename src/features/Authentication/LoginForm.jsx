/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form";
import styled from "styled-components";

import useSignIn from "./useSignIn";

import Form from "../../ui/Form";
import Row from "../../ui/Row";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Button from "../../ui/Button";
import Error from "../../ui/Error";

const StyledLoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  width: 45rem;
  padding: 2.4rem 3.6rem;
`;

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { logIn, isLogingIn } = useSignIn();

  const handleLoginSubmit = (data) => {
    logIn(data, {
      onSettled: () => {
        reset();
      },
    });
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit(handleLoginSubmit)}>
      <Row direction="vertical">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          defaultValue={"pewip66128@mfyax.com"}
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
          })}
          disabled={isLogingIn}
        />
        {errors.email && <Error>{errors.email?.message}</Error>}
      </Row>

      <Row direction="vertical">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          defaultValue={"11111111"}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars",
            },
          })}
          disabled={isLogingIn}
        />
        {errors.password && <Error>{errors.password?.message}</Error>}
      </Row>

      <Button disabled={isLogingIn}>Login</Button>
    </StyledLoginForm>
  );
}
