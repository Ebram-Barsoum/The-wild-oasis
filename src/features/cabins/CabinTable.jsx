/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import useGetCabins from "./useGetCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import EmptyMessage from "../../ui/EmptyMessage";

export default function CabinTable() {
  const { cabins, isLoading } = useGetCabins();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <EmptyMessage resourceName={"Cabins"} />;

  const filter = searchParams.get("discount") || "all";

  const filteredCabins =
    filter === "all"
      ? cabins
      : filter === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins.filter((cabin) => cabin.discount !== 0);

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [sortField, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let displayedCabins = filteredCabins.sort(
    (cabin1, cabin2) => (cabin1[sortField] - cabin2[sortField]) * modifier
  );

  return (
    <Menus>
      <Table role="table" columns={".6fr 1.8fr 2.2fr  1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={displayedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
