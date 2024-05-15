import Header from "../ui/Header";
import UpdateUserDataForm from "../features/user/UpdateUserDataForm";
import UpdatePasswordForm from "../features/user/UpdatePasswordForm";

export default function Account() {
  return (
    <>
      <Header as="h1">Update your account</Header>
      <UpdateUserDataForm />

      <UpdatePasswordForm />
    </>
  );
}
