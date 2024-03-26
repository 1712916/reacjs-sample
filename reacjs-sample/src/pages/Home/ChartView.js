import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import ExpenseCard from "./ExpenseCard";
import { callGetExpenseList } from "../ExpenseInput/ExpenseApi";
import dayjs from "dayjs";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ChartView() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    callGetExpenseList(
      (data) => {
        data.sort((a, b) => {
          const d1 = dayjs(a.date, "YYYY-MM-DDTHH:mm:ss");
          const d2 = dayjs(b.date, "YYYY-MM-DDTHH:mm:ss");
          return d2.diff(d1);
        });

        const chartData = {};

        for (const e of data) {
          const a = chartData[e.category.name];
          if (a === undefined) {
            chartData[e.category.name] = e.amount;
          } else {
            chartData[e.category.name] += e.amount;
          }
        }

        const formattedChartData = Object.keys(chartData).map((key, index) => ({
          id: index,
          value: chartData[key],
          label: key,
        }));
        setChart(formattedChartData);
      },
      (err) => {},
      () => {},
    );
  }, []);

  return (
    <Container
      sx={{
        m: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Biểu đồ</Typography>

        <PieChart
          series={[
            {
              data: chart,
            },
          ]}
          width={800}
          height={400}
        />
      </Stack>
    </Container>
  );
}
