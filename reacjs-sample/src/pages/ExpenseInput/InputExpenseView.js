import { Box, Grid } from "@mui/material";
import InputView from "./InputView";
import { TodayExpenseList } from "./TodayExpenseList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { callGetTodayExpenseList, callUpdateExpense } from "./ExpenseApi";
import { DragDropContext } from "react-beautiful-dnd";
import { SnackMessageType, useSnackbar } from "../../components/SnackBar";

export default function InputExpenseView() {
  const [date, setDate] = useState(dayjs());
  const [list, setList] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const { openSnackbar } = useSnackbar();

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

  function handleOnDragEnd(result) {
    setIsDragging(false);

    const destination = result.destination;
    if (!result.destination) return;

    const expenseId = destination.droppableId;

    const expenseIndex = list.findIndex((e) => {
      return e.id === expenseId;
    });

    if (expenseIndex < 0) return;

    const categoryIndex = result.source.index;

    const category = categoryList[categoryIndex];

    const oldExpense = { ...list[expenseIndex] };
    const newExpense = { ...list[expenseIndex] };

    newExpense.category = category;

    list[expenseIndex] = newExpense;

    setList([...list]);
    //todo: call api update category
    callUpdateExpense(
      newExpense,
      () => {
        //update success
      },
      (err) => {
        //update error reverse session
        list[expenseIndex] = oldExpense;

        setList([...list]);

        openSnackbar(`${err}`, SnackMessageType.error);
      },
      () => {}
    );
  }

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={() => {
        setIsDragging(true);
      }}>
      <Box sx={{ flexGrow: 1, m: 1, p: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={8}>
            <InputView
              date={date}
              setDate={(date) => setDate(date)}
              onAddSuccess={(expense) => {
                setList([expense, ...list]);
              }}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
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
              isDragging={isDragging}
            />
          </Grid>
        </Grid>
      </Box>
    </DragDropContext>
  );
}
