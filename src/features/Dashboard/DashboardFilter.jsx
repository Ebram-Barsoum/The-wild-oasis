import Filter from "../../ui/Filter";

export default function DashboardFilter() {
  return (
    <Filter
      filterBasedOn={"last"}
      options={["Last 10 days", "Last 30 days", "Last 90 days"]}
    />
  );
}
