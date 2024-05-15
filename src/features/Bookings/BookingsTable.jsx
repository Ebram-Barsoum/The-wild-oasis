import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import useGetBookings from "./useGetBookings";
import EmptyMessage from "../../ui/EmptyMessage";
import Pagination from "../../ui/Pagination";

export default function BookingsTable() {
  const { bookings, count, isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <EmptyMessage resourceName={"Bookings"} />;

  return (
    <Menus>
      <Table role="table" columns={".6fr 1.6fr 1.6fr  1fr 1fr 3rem"}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        ></Table.Body>

        <Table.Footer>
          <Pagination results={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
