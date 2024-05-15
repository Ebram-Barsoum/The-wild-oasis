/* eslint-disable no-unused-vars */
import useCurrentUser from "../Authentication/useCurrentUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Header from "../../ui/Header";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { useState } from "react";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useCurrentUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState("");
  const { updateUser, isUpdating } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, avatar });

    if ((fullName === currentFullName || !fullName) && !avatar) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar("");
          e.target.reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setAvatar(null);
    setFullName(currentFullName);
  };

  return (
    <>
      <Header as="h3">Update user data</Header>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="email">Email Address</Label>
          <Input value={email} disabled id="email" />
        </FormRow>

        <FormRow>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            id="fullName"
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="avatar">Avatar Image</Label>
          <FileInput
            disabled={isUpdating}
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            // We should also validate that it's actually an image, but never mind
          />
        </FormRow>

        <FormRow>
          <Button
            onClick={handleCancel}
            type="reset"
            variation="secondary"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateUserDataForm;
