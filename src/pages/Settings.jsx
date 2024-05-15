import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Header from "../ui/Header";

export default function Settings() {
  return (
    <>
      <Header as="h1">Updating hotel settings</Header>
      <UpdateSettingsForm />
    </>
  );
}
