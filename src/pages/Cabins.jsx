import CabinTable from "../features/cabins/CabinTable";
import Header from "../ui/Header";
import AddCabin from "../features/cabins/AddCabin";
import Row from "../ui/Row";
import CabinsOperations from "../features/cabins/CabinsOperations";

export default function Cabins() {
  return (
    <>
      <Row>
        <Header as="h1">All Cabins</Header>
        <CabinsOperations />
      </Row>
      <CabinTable />
      <AddCabin />
    </>
  );
}
