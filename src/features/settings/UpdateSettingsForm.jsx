/* eslint-disable no-unused-vars */
import useGetSettings from "./useGetSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import useUpdateSEttings from "./useUpdateSettings";

export default function UpdateSettingsForm() {
  const { register } = useForm();

  const { settings, isLoading } = useGetSettings();
  const { updateSettings, isUpdating } = useUpdateSEttings();

  if (isLoading) return <Spinner />;

  const {
    breakfastPrice,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
  } = settings;

  const handleUpdateField = (name, value) => {
    if (!value) return;
    const newFiled = {};
    newFiled[name] = value;
    updateSettings(newFiled);
  };

  return (
    <Form>
      <FormRow>
        <Label htmlFor="minBookingLength">Minimum night for booking</Label>
        <Input
          id="minBookingLength"
          type="number"
          name="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdateField(e.target.name, e.target.value);
          }}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxBookingLength">Maximum night for booking</Label>
        <Input
          id="maxBookingLength"
          name="maxBookingLength"
          type="number"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdateField(e.target.name, e.target.value);
          }}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxGuestsPerBooking">Maximum gests per booking</Label>
        <Input
          id="maxGuestsPerBooking"
          name="maxGuestsPerBooking"
          type="number"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdateField(e.target.name, e.target.value);
          }}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="breakfastPrice">Breakfast Price</Label>
        <Input
          id="breakfastPrice"
          name="breakfastPrice"
          type="number"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdateField(e.target.name, e.target.value);
          }}
        />
      </FormRow>
    </Form>
  );
}
