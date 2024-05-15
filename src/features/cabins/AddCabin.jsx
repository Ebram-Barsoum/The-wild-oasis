/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "../../ui/ModalC";
import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import Button from "../../ui/Button";
const StyledButton = styled(Button)`
  display: block;
  margin-right: auto;
`;

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open name="cabin-form">
        <StyledButton>Add new cabin</StyledButton>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const toggleModal = () => {
//     setIsOpenModal((state) => !state);
//   };

//   return (
//     <div>
//       <StyledButton onClick={toggleModal}>Add new Cabin</StyledButton>
//       {/* {showForm && <CreateCabinForm />} */}
//       {isOpenModal && (
//         <Modal toggleModal={toggleModal}>
//           <CreateCabinForm toggleModal={toggleModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
