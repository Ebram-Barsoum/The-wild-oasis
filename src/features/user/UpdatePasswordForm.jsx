import { useForm } from "react-hook-form";
import useUpdateUser from "./useUpdateUser";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Error from "../../ui/Error";

import Button from "../../ui/Button";
import Header from "../../ui/Header";

export default function UpdatePasswordForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  const handleSubmitForm = ({ password }) => {
    updateUser(
      { password },
      {
        onSuccess: () => reset(),
      }
    );
  };

  const validateRepassword = (repassword) => {
    return getValues().password === repassword || "This doesn't match password";
  };

  return (
    <>
      <Header as="h3">Update password</Header>

      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormRow>
          <Label htmlFor="password">New password</Label>
          <Input
            type="password"
            id="password"
            disabled={isUpdating}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 chars",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="rePassword">Confirm password</Label>
          <Input
            type="password"
            id="rePassword"
            disabled={isUpdating}
            {...register("rePassword", {
              required: "You have to confirm password",
              validate: validateRepassword,
            })}
          />
          {errors.rePassword && <Error>{errors.rePassword.message}</Error>}
        </FormRow>

        <FormRow>
          <Button
            type="reset"
            onClick={reset}
            variation="secondary"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}
