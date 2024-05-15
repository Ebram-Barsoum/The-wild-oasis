/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Header from "../../ui/Header";
import { useDarkMode } from "../../Contexts/DarkModeContext";

const StyledStaysChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  flex-basis: 1;

  & {
    @media (max-width: 768px) {
      overflow: auto;
    }
  }

  overflow: auto;
  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

function prepareDate(stays, startData) {
  const increaseCategoryValue = (arr, category) => {
    return arr.map((ele) => {
      if (ele.duration === category) ele.value += 1;

      return ele;
    });
  };

  const preparedData = stays
    .reduce((updatedData, currentStay) => {
      const nights = currentStay.numNights;
      if (nights === 1) return increaseCategoryValue(updatedData, "1 night");
      if (nights === 2) return increaseCategoryValue(updatedData, "2 nights");
      if (nights === 3) return increaseCategoryValue(updatedData, "3 nights");
      if (nights >= 4 && nights < 6)
        return increaseCategoryValue(updatedData, "4-5 nights");
      if (nights >= 6 && nights < 8)
        return increaseCategoryValue(updatedData, "6-7 nights");
      if (nights >= 8 && nights < 15)
        return increaseCategoryValue(updatedData, "8-14 nights");
      if (nights >= 15 && nights < 22)
        return increaseCategoryValue(updatedData, "15-21 nights");
      if (nights >= 22) return increaseCategoryValue(updatedData, "21+ nights");

      return updatedData;
    }, startData)
    .filter((ele) => ele.value > 0);

  return preparedData;
}

export default function StaysChart({ confirmedStays }) {
  const startDataLight = [
    {
      duration: "1 night",
      value: 0,
      color: "#ef4444",
    },
    {
      duration: "2 nights",
      value: 0,
      color: "#f97316",
    },
    {
      duration: "3 nights",
      value: 0,
      color: "#eab308",
    },
    {
      duration: "4-5 nights",
      value: 0,
      color: "#84cc16",
    },
    {
      duration: "6-7 nights",
      value: 0,
      color: "#22c55e",
    },
    {
      duration: "8-14 nights",
      value: 0,
      color: "#14b8a6",
    },
    {
      duration: "15-21 nights",
      value: 0,
      color: "#3b82f6",
    },
    {
      duration: "21+ nights",
      value: 0,
      color: "#a855f7",
    },
  ];

  const startDataDark = [
    {
      duration: "1 night",
      value: 0,
      color: "#b91c1c",
    },
    {
      duration: "2 nights",
      value: 0,
      color: "#c2410c",
    },
    {
      duration: "3 nights",
      value: 0,
      color: "#a16207",
    },
    {
      duration: "4-5 nights",
      value: 0,
      color: "#4d7c0f",
    },
    {
      duration: "6-7 nights",
      value: 0,
      color: "#15803d",
    },
    {
      duration: "8-14 nights",
      value: 0,
      color: "#0f766e",
    },
    {
      duration: "15-21 nights",
      value: 0,
      color: "#1d4ed8",
    },
    {
      duration: "21+ nights",
      value: 0,
      color: "#7e22ce",
    },
  ];

  const { mode } = useDarkMode();
  const startDate = mode === "dark" ? startDataDark : startDataLight;
  const data = prepareDate(confirmedStays, startDate);

  return (
    <StyledStaysChart>
      <Header as="h3">Stays duration summary</Header>

      <ResponsiveContainer width={400} height={250}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={90}
            outerRadius={110}
            paddingAngle={5}
            nameKey={"duration"}
            dataKey={"value"}
          >
            {data.map((entry) => (
              <Cell
                name={entry.duration}
                key={`cell-${entry.color}`}
                fill={entry.color}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="triangle"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledStaysChart>
  );
}
