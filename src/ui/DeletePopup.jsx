/* eslint-disable react/prop-types */
import styled from "styled-components";
import Row from "./Row";
import Header from "./Header";
import Button from "./Button";

const StyledRow = styled(Row)`
  justify-content: end;
  gap: 1.6rem;
`;

const StyledDeletePopup = styled(Row)`
  width: 48rem;
  padding: 1.6rem 0 0.6rem;
  gap: 1.2rem;
`;

export default function DeletePopup({
  closeModal,
  id,
  resource,
  onConfirm,
  disable,
}) {
  return (
    <StyledDeletePopup direction="vertical">
      <Header as="h3"> Delete {resource}</Header>
      <Row>
        Are you sure you want to delete this {resource} #{id} permanently? This
        action cannot be undone.
      </Row>

      <StyledRow>
        <Button variation="secondary" onClick={closeModal} disabled={disable}>
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disable}
          onClick={() => {
            onConfirm(id);
            closeModal();
          }}
        >
          Delete
        </Button>
      </StyledRow>
    </StyledDeletePopup>
  );
}
