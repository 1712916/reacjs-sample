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
import {
  callGetTotalExpenseByMonths,
  callGetTotalExpenseByQuarters,
} from "./TotalExpenseByMonthApi";
import { axisClasses } from "@mui/x-charts";
import { moneyFormat } from "../../utils/number_utils";

export default function QuarterChartView() {
  const [quarter, setQuarter] = useState([]);

  useEffect(() => {
    callGetTotalExpenseByQuarters(
      2024,
      (data) => {
        alert(JSON.stringify(data));
        setQuarter(data);
      },
      (err) => {},
      () => {}
    );
  }, []);

  const chartSetting = {
    series: [{ dataKey: "amount" }],
    width: 1000,
    height: 500,
  };

  const quaterFormatter = (value) => `Quý ${value}`;
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
        <Typography variant="h3">Biểu đồ theo quý</Typography>
        {quarter.length <= 0 ? (
          <Box />
        ) : (
          <BarChart
            dataset={quarter}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "quarter",
                valueFormatter: quaterFormatter,
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
          />
        )}
      </Stack>
    </Box>
  );
}
