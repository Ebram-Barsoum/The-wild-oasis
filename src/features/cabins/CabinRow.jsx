/* eslint-disable react/prop-types */

import styled from "styled-components";
import { FaCopy } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";

import { formatCurrency } from "../../utils/helper";
import useCreateCabin from "./useCreateCabin.js";
import useDeleteCabin from "./useDeleteCabin";

import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/ModalC.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import DeletePopup from "../../ui/DeletePopup.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;

  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);

  & {
    @media (max-width: 992px) {
      font-size: 1.4rem !important;
    }
  }
`;

const Capacity = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 500;

  & {
    @media (max-width: 992px) {
      font-size: 1.1rem !important;
    }
  }
`;
const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { createCabin, creatingStatus } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const handleDeuplicating = () => {
    const newCabin = { ...cabin };
    delete newCabin.id;

    createCabin(newCabin);
  };
  const isDuplicating = creatingStatus === "pending";

  return (
    <Table.Row role="row">
      <Img src={cabin.image} alt={cabin.description} />
      <Cabin>{cabin.name}</Cabin>
      <Capacity>Fits up to {cabin.maxCapacity} guests</Capacity>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>
        {cabin.discount !== 0 ? formatCurrency(cabin.discount) : "_"}
      </Discount>

      <Menus.Menu>
        <Modal>
          <Menus.Toggle id={cabin.id} />

          <Menus.List id={cabin.id}>
            <Menus.Option disabled={isDuplicating} onClick={handleDeuplicating}>
              <FaCopy size={10} />
              <span>Dubplicate</span>
            </Menus.Option>

            <Modal.Open name="cabin-update">
              <Menus.Option>
                <MdOutlineModeEdit />
                Edit
              </Menus.Option>
            </Modal.Open>

            <Modal.Open name="cabin-delete">
              <Menus.Option>
                <FaRegTrashCan />
                Delete
              </Menus.Option>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="cabin-update">
            <CreateCabinForm cabinForEditing={cabin} />
          </Modal.Window>

          <Modal.Window name="cabin-delete">
            <DeletePopup
              resource={"Cabin"}
              id={cabin.id}
              onConfirm={() => deleteCabin(cabin.id)}
              disable={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </Menus.Menu>
    </Table.Row>
  );
}
