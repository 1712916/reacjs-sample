import { Box, Grid } from "@mui/material";
import InputView from "./InputView";
import { TodayExpenseList } from "./TodayExpenseList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { callGetTodayExpenseList } from "./ExpenseApi";

export default function InputExpenseView() {
  const [date, setDate] = useState(dayjs());
  const [list, setList] = useState([]);

  useEffect(() => {
    callGetTodayExpenseList(
      date,
      (data) => {
        setList(data.reverse());
      },
      (err) => {},
      (done) => {}
    );
  }, [date]);

  return (
    <Box sx={{ flexGrow: 1, m: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <InputView
            date={date}
            setDate={(date) => setDate(date)}
            onAddSuccess={(expense) => {
              setList([expense, ...list]);
            }}
          />
        </Grid>
        <Grid xs={4}>
          <TodayExpenseList
            date={date}
            list={list}
            onRemoveAtIndex={(index) => {
              list.splice(index, 1);
              setList([...list]);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
