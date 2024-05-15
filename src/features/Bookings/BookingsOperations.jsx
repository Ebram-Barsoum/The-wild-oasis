import TableOperations from "../../ui/TableOperation";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function BookingsOperations() {
  return (
    <TableOperations>
      <Filter
        filterBasedOn={"status"}
        options={["all", "unconfirmed", "checked-in", "checked-out"]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "Sort by date [Earlier first]" },
          { value: "startDate-desc", label: "Sort by date [Recent first]" },
          {
            value: "totalPrice-desc",
            label: "Sort by total price [high first]",
          },
          {
            value: "totalPrice-asc",
            label: "Sort by total price [low first]",
          },
        ]}
        value={"startDate-asc"}
      />
    </TableOperations>
  );
}
