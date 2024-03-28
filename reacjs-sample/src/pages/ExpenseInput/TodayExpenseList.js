import React, { useEffect, useState } from "react";
import { SnackMessageType, useSnackbar } from "../../components/SnackBar";
import { callGetDeleteExpense, callGetTodayExpenseList } from "./ExpenseApi";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import ExpenseCard from "../Home/ExpenseCard";
import { moneyFormat } from "../../utils/number_utils";

export function TodayExpenseList({ date, list, onRemoveAtIndex }) {
  const { openSnackbar } = useSnackbar();

  const total = list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        {date.isSame(dayjs().format("YYYY-MM-DD"), "day")
          ? "Hôm nay"
          : date.format("DD-MM-YYYY")}
      </Typography>
      <Typography variant="h5">{moneyFormat(total)}</Typography>
      {list.map((e, index) => (
        <ExpenseCard
          expense={e}
          onDelete={() => {
            callGetDeleteExpense(
              e,
              () => {
                openSnackbar("Xoá thành công", SnackMessageType.success);
                onRemoveAtIndex(index);
              },
              () => {
                openSnackbar("Xoá thất bại", SnackMessageType.error);
              },
              () => {}
            );
          }}
        />
      ))}
    </Stack>
  );
}
