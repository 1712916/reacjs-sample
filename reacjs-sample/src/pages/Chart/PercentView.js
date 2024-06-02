import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { PieChart } from "@mui/x-charts/PieChart";
import { stringToColor } from "../../utils/string_utils";
import {
  getStartAndEndMonth,
  getStartAndEndOfCurrentMonth,
  getStartAndEndOfLastMonth,
} from "../../utils/date_utils";
import { callGetTotalExpenseByCategory } from "./TotalExpenseByCategoryApi";
import { BasicDateRangePicker } from "../../components/BasicDateRangePicker";
import { moneyFormat } from "../../utils/number_utils";
import { chartHeight } from "../Home/ChartView";

export const filters = [
  "Tháng này",
  "Tháng trước",
  "3 tháng gần nhất",
  "Tuỳ chỉnh",
];

export default function PercentChartView() {
  const [chart, setChart] = useState([]);
  const [filter, setFilter] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    switch (filter) {
      case 0:
        var [fDate, lDate] = getStartAndEndOfCurrentMonth();
        setStartDate(fDate);
        setEndDate(lDate);
        break;
      case 1:
        var [fDate, lDate] = getStartAndEndOfLastMonth();
        setStartDate(fDate);
        setEndDate(lDate);
        break;
      case 2:
        var [_, lDate] = getStartAndEndOfLastMonth();
        var [fDate, __] = getStartAndEndMonth(dayjs().subtract(3, "month"));
        setStartDate(fDate);
        setEndDate(lDate);
      default:
        break;
    }
  }, [filter]);

  useEffect(() => {
    console.log("start date: ", startDate);
    console.log("last date: ", endDate);
    if (startDate !== null && endDate !== null) {
      callGetTotalExpenseByCategory(
        startDate,
        endDate,
        (data) => {
          setChart(
            data.map((e, i) => {
              return {
                id: e.id,
                value: e.amount,
                label: e.name,
                color: stringToColor(e.name),
              };
            })
          );
        },
        (err) => {},
        () => {}
      );
    }
  }, [startDate, endDate]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const TOTAL = chart.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <Stack spacing={1}>
        <Typography variant="h3">Tỉ lệ chi tiêu</Typography>

        <Stack direction="row" spacing={2}>
          <FormControl>
            <Select value={filter} onChange={handleChange}>
              {filters.map((e, i) => (
                <MenuItem value={i}>{e}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {filter === 3 ? (
            <BasicDateRangePicker
              start={startDate}
              end={endDate}
              onChange={([start, end]) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          ) : (
            <Box />
          )}
          <Typography variant="h6">Tổng: {moneyFormat(TOTAL)}</Typography>

          {/* {filter === 3 && (
    <BasicDateRangePicker />
    // start={startDate}
    // end={endDate}
    // onChange={([start, end]) => {
    //   alert(start, end);
    // }}
  )} */}
        </Stack>

        <PieChart
          series={[
            {
              data: chart,
              arcLabel: getArcLabel,
            },
          ]}
          height={chartHeight}
        />
      </Stack>
    </Box>
  );
}
