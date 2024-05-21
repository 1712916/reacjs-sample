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

import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { callGetTotalExpenseByMonths } from "./TotalExpenseByMonthApi";
import { axisClasses } from "@mui/x-charts";
import { moneyFormat } from "../../utils/number_utils";
import { chartHeight } from "../Home/ChartView";

export default function MonthChartView() {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    callGetTotalExpenseByMonths(
      2024,
      (data) => {
        setMonths(data);
      },
      (err) => {},
      () => {}
    );
  }, []);

  const chartSetting = {
    series: [{ dataKey: "amount" }],
  };

  const monthFormatter = (value) => `Tháng ${value}`;
  const vndFormat = (value) => {
    if (value >= 1000000) {
      return `${moneyFormat(value / 1000000)}m`;
    } else if (value >= 1000) {
      return `${moneyFormat(value / 1000)}k`;
    }
    return moneyFormat(value);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h3">Biểu đồ theo tháng</Typography>
        {months.length <= 0 ? (
          <Box />
        ) : (
          <BarChart
            dataset={months}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "month",
                valueFormatter: monthFormatter,
                tickPlacement: "middle",
              },
            ]}
            yAxis={[
              {
                min: 0,
                scaleType: "linear",
                labelStyle: {
                  fontSize: 15,
                  lineHeight: 30,
                },
                valueFormatter: vndFormat,
                //labelStyle: { ??? },
              },
            ]}
            {...chartSetting}
            height={chartHeight}
          />
        )}
      </Stack>
    </Box>
  );
}
