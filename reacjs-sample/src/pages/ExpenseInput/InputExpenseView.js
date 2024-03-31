import { Box, Grid } from "@mui/material";
import InputView from "./InputView";
import { TodayExpenseList } from "./TodayExpenseList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { callGetTodayExpenseList } from "./ExpenseApi";
import { DragDropContext } from "react-beautiful-dnd";

export default function InputExpenseView() {
  const [date, setDate] = useState(dayjs());
  const [list, setList] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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
    // alert(JSON.stringify(result));
    const destination = result.destination;
    if (!result.destination) return;

    const expenseId = destination.droppableId;

    const expenseIndex = list.findIndex((e) => {
      return e.id === expenseId;
    });

    if (expenseIndex < 0) return;

    const categoryIndex = result.source.index;

    const category = null; //todo

    //todo: call api update category

    //update local list
    list[expenseIndex].category = category;

    setList([...list]);
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
