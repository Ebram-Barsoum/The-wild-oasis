/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Label from "../../ui/Label";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";
import Error from "../../ui/Error";

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

export default function CreateCabinForm({ cabinForEditing = {}, closeModal }) {
  const { id: editId, ...cabinInfo } = cabinForEditing;
  const isEditingForm = !!editId;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingForm ? cabinInfo : {},
  });
  const { errors } = formState;

  const { createCabin, creatingStatus } = useCreateCabin();
  const { updateCabin, updatingStatus } = useUpdateCabin();

  const handleSubmitForm = (data) => {
    //console.log(data);
    //console.log(editId);

    if (isEditingForm) {
      updateCabin(
        { data, editId, cabinInfo },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        }
      );
      return;
    }

    createCabin(data, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const isWorking =
    creatingStatus === "pending" || updatingStatus === "pending";

  return (
    <Form
      onSubmit={handleSubmit(handleSubmitForm)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          id="name"
          type="text"
          disabled={isWorking}
          {...register("name", {
            required: "This field must be filled",
          })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="max-capacity">Maximum capacity</Label>
        <Input
          id="max-capacity"
          type="number"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field must be filled",
            min: {
              value: 1,
              message: "Max capacity must be at least 1",
            },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Regular price</Label>
        <Input
          id="price"
          type="number"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field must be filled",
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          id="discount"
          type="number"
          disabled={isWorking}
          {...register("discount", {
            required: "This field must be filled",
            min: {
              value: 0,
              message: "Discount cannot be negative value",
            },
            validate: (value) => {
              return (
                +value <= +getValues().regularPrice ||
                "Dicount must be less than or equal the regular price"
              );
            },
          })}
          defaultValue={0}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin image</Label>

        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingForm ? false : "This field is must be filled",
          })}
        />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {isEditingForm ? "Edit cabin" : " Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
