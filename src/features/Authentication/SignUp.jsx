/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Error from "../../ui/Error";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const { signUp, isLoading } = useSignUp();

  const handleSubmitForm = (data) => {
    console.log(data);
    signUp(data, {
      onSettled: () => reset(),
    });
  };

  const validateRepassword = (value) => {
    return getValues().password === value || "This does not match the password";
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm)}>
      <FormRow>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          autoComplete="user-name"
          {...register("fullName", { required: "User fullName is required" })}
          disabled={isLoading}
        />
        {errors?.fullName && <Error>{errors?.fullName.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid Email" },
          })}
          disabled={isLoading}
        />
        {errors?.email && <Error>{errors?.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 chars",
            },
          })}
          disabled={isLoading}
        />
        {errors?.password && <Error>{errors?.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="rePassowrd">Confirm Password</Label>
        <Input
          type="password"
          id="rePassowrd"
          {...register("rePassword", {
            required: "You must confirm password",
            validate: validateRepassword,
          })}
          disabled={isLoading}
        />
        {errors?.rePassword && <Error>{errors?.rePassword.message}</Error>}
      </FormRow>

      <FormRow>
        <ButtonGroup>
          <Button
            variation="secondary"
            type="reset"
            onClick={reset}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>Create New User</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}
