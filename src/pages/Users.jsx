import SignUp from "../features/Authentication/SignUp";
import Header from "../ui/Header";

export default function Users() {
  return (
    <>
      <Header as="h1">Create a new user</Header>
      <SignUp />
    </>
  );
}
