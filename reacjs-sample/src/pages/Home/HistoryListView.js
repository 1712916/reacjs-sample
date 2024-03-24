import { useEffect, useState } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import ExpenseCard from "./ExpenseCard";
import { callGetExpenseList } from "../ExpenseInput/ExpenseApi";
import dayjs from "dayjs";

export default function HistoryListView() {
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    callGetExpenseList(
      (data) => {
        data.sort((a, b) => {
          const d1 = dayjs(a.date, "YYYY-MM-DDTHH:mm:ss");
          const d2 = dayjs(b.date, "YYYY-MM-DDTHH:mm:ss");
          return d2.diff(d1);
        });
        setExpenseList(data);
      },
      (err) => {},
      () => {},
    );
  }, []);

  return (
    <Box>
      <Stack spacing={2}>
        <Typography>History</Typography>

        {expenseList.map((e, index) => (
          // <Card>
          //   <Typography>{JSON.stringify(e)}</Typography>
          // </Card>
          <ExpenseCard key={index} expense={e} />
        ))}
      </Stack>
    </Box>
  );
}
