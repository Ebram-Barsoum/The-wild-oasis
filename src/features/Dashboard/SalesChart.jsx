/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDarkMode } from "../../Contexts/DarkModeContext";
import Header from "../../ui/Header";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--color-grey-0);
  padding: 1.6rem 2.4rem;
  border-radius: var(--border-radius-sm);
`;

export default function SalesChart({ bookings, numOfDays }) {
  const { mode } = useDarkMode();

  const colors =
    mode === "dark"
      ? {
          totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
          extraSales: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
          extraSales: { stroke: "#22c55e", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, booking) => (acc += booking.totalPrice), 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, booking) => (acc += booking.extraPrice), 0),
    };
  });

  console.log(allDates[0]);

  return (
    <StyledSalesChart>
      <Header as="h3">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[numOfDays - 1], "MMM dd yyyy")}
      </Header>

      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3" />

          <XAxis dataKey={"label"} stroke={colors.text} />
          <YAxis unit="$" dataKey={"totalSales"} stroke={colors.text} />

          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            name="total sales"
            unit={"$"}
            {...colors.totalSales}
          />

          <Area
            dataKey={"extraSales"}
            type={"monotone"}
            name="extra sales"
            unit={"$"}
            {...colors.extraSales}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
