import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Grid,
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
import {
  callGetTotalExpenseOfCurrentMonth,
  callGetTotalExpenseOfLastMonth,
} from "../ExpenseInput/TotalExpenseApi";
import { moneyFormat } from "../../utils/number_utils";
import { BasicDatePicker } from "../../components/BasicDatePicker";
import PercentChartView from "../Chart/PercentView";
import WeekExpenseChart from "../Chart/WeekExpenseChart";
import MonthChartView from "../Chart/MonthChartView";
import QuarterChartView from "../Chart/QuarterChartView";

export const chartHeight = 400;

export default function ChartView() {
  function GirdItem({ view }) {
    return (
      <Grid container item xs={12} sm={12} md={12} lg={6} xl={3}>
        {view}
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        m: 2,
      }}>
      <Stack spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={2}>
            <CurrentMonthTotalExpenseCard />
            <LastMonthTotalExpenseCard />
          </Stack>
        </Box>
        <Grid container>
          <GirdItem view={<PercentChartView />} />
          <GirdItem view={<WeekExpenseChart />} />
          <GirdItem view={<MonthChartView />} />
          <GirdItem view={<QuarterChartView />} />
        </Grid>
      </Stack>
    </Box>
  );
}

function CurrentMonthTotalExpenseCard() {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    callGetTotalExpenseOfCurrentMonth(
      (data) => {
        setTotalExpense(data);
      },
      (err) => {},
      () => {}
    );
  }, []);

  return (
    <Card>
      <CardHeader title="Tháng này" />
      <CardContent>
        <Typography variant="h4">{moneyFormat(totalExpense)}</Typography>
      </CardContent>
    </Card>
  );
}

function LastMonthTotalExpenseCard() {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    callGetTotalExpenseOfLastMonth(
      (data) => {
        setTotalExpense(data);
      },
      (err) => {},
      () => {}
    );
  }, []);

  return (
    <Card>
      <CardHeader title="Tháng trước" />
      <CardContent>
        <Typography variant="h4">{moneyFormat(totalExpense)}</Typography>
      </CardContent>
    </Card>
  );
}
