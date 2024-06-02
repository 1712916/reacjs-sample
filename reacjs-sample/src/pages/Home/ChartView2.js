import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  FormControl,
  Grid,
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
import PercentChartView, { filters } from "../Chart/PercentView";
import WeekExpenseChart from "../Chart/WeekExpenseChart";
import MonthChartView from "../Chart/MonthChartView";
import QuarterChartView from "../Chart/QuarterChartView";
import { BasicDateRangePicker } from "../../components/BasicDateRangePicker";
import { callGetCategoriesCount } from "../Chart/CategoryCountApi";
import { callGetTotalExpenseByCategoryIds } from "../Chart/TotalExpenseByCategoryApi";
import {
  getStartAndEndMonth,
  getStartAndEndOfCurrentMonth,
  getStartAndEndOfLastMonth,
} from "../../utils/date_utils";
import { stringToColor } from "../../utils/string_utils";

export const chartHeight = 400;

///lấy danh sách category
///chọn các loại category
///chọn khoảng thời gian
///hiển thị biểu đồ tròn
///hiển thị thống kê số lần hoạt động của category
/////sắp xếp theo thứ tự từ cao xuống thấp

export default function ChartView2() {
  const [chart, setChart] = useState([]);
  const [filter, setFilter] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [categorySelectedList, setCategorySelectedList] = useState(new Set([]));

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const TOTAL = chart.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  function GirdItem({ view }) {
    return (
      <Grid container item xs={12} sm={12} md={12} lg={6} xl={3}>
        {view}
      </Grid>
    );
  }

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      callGetCategoriesCount(
        startDate,
        endDate,
        (data) => {
          setCategoryList(data);
        },
        () => {},
        () => {}
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setCategorySelectedList(new Set());
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
      callGetTotalExpenseByCategoryIds(
        Array.from(categorySelectedList).map((e) => e.id),
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
  }, [startDate, endDate, categorySelectedList]);

  function selectCategory(cate) {
    if (categorySelectedList.has(cate)) {
      categorySelectedList.delete(cate);
    } else {
      categorySelectedList.add(cate);
    }

    setCategorySelectedList(new Set(categorySelectedList));
  }

  return (
    <Box
      sx={{
        m: 2,
      }}>
      <Stack spacing={2}>
        <Grid container>{/* <GirdItem view={<PercentChartView />} /> */}</Grid>
      </Stack>
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
      </Stack>
      <Grid container spacing={1}>
        {categoryList.map((category, index) => (
          <Grid item key={index}>
            <Chip
              label={category.name + " " + category.count}
              variant={
                categorySelectedList.has(category) ? "filled" : "outlined"
              }
              key={index}
              onClick={() => selectCategory(category)}
              // onDelete={() => {
              //   handleDelete(category);
              // }}>
            >
              {category.name}
            </Chip>
          </Grid>
        ))}
      </Grid>

      <PieChart
        series={[
          {
            data: chart,
            arcLabel: getArcLabel,
          },
        ]}
        height={chartHeight}
      />
    </Box>
  );
}
