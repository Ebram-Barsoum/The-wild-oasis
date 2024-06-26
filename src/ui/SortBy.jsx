/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      defaultValue={value}
      handleChange={handleChange}
      type="white"
    />
  );
}
