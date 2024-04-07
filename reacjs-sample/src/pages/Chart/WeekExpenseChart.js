import { Box, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { getWeekCurrentWeekDays, weekDays } from "../../utils/date_utils";
import { callGetListTotalExpenseFromDateToDate } from "../ExpenseInput/TotalExpenseApi";

export default function WeekExpenseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    var weekDates = getWeekCurrentWeekDays();

    callGetListTotalExpenseFromDateToDate(
      weekDates[0],
      weekDates.pop(),
      (data) => {
        setData(
          data.map((e, i) => {
            return e.amount;
          })
        );
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  }, []);

  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="h3">Tuần này</Typography>
        <LineChart
          xAxis={[{ scaleType: "point", data: weekDays }]}
          series={[
            {
              data: data,
            },
          ]}
          width={1000}
          height={500}
        />
      </Stack>
    </Box>
  );
}
