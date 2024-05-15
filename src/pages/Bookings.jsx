import Row from "../ui/Row";
import Header from "../ui/Header";
import BookingsTable from "../features/Bookings/BookingsTable";
import BookingsOperations from "../features/Bookings/BookingsOperations";

export default function Bookings() {
  return (
    <>
      <Row>
        <Header as="h1">All Bookings</Header>
        <BookingsOperations />
      </Row>
      <BookingsTable />
    </>
  );
}
