import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getSuggestMoneyList } from "../../utils/suggest_money";
import ExpenseCard from "../Home/ExpenseCard";
import {
  callGetCategoryList,
  callGetMoneySourceList,
  callSubmitExpense,
} from "./ExpenseApi";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function InputView() {
  const [inputValue, setInputValue] = useState(null);
  const [suggestMoneyList, setSuggestMoneyList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [moneySourceList, setMoneySourceList] = useState([]);
  const [selectedMoneySource, setSelectedMoneySource] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs());
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  useEffect(() => {
    setSuggestMoneyList(getSuggestMoneyList(inputValue));
  }, [inputValue]);

  useEffect(() => {
    callGetCategoryList(
      (categories) => {
        setCategoryList(categories);
        setSelectedCategory(categories[0]);
      },
      () => {},
    );

    callGetMoneySourceList(
      (sources) => {
        setMoneySourceList(sources);
        setSelectedMoneySource(sources[0]);
      },
      () => {},
    );
  }, []);

  const handleChange = (event) => {
    const regex = /^[0-9]*$/;
    if (regex.test(event.target.value)) {
      setInputValue(event.target.value);
    }
  };

  const handleSubmit = () => {
    const expense = {
      amount: inputValue,
      category: selectedCategory,
      description: note,
      type: 0,
      source: selectedMoneySource,
      date: date.format("YYYY-MM-DDTHH:mm:ss"),
    };
    callSubmitExpense(
      expense,
      (res) => {
        setOpenSnackBar(true);
        setInputValue(null);
        setNote("");
      },
      (err) => {
        alert(err);
      },
      () => {},
    );
  };
  return (
    <Box
      sx={{
        backgroundColor: "#c0d7f1",
        p: "16px",
        alignItems: "center",
        width: "50%",
        m: 2,
      }}
    >
      <Stack direction="row" spacing={4}>
        <TextField
          label="Nhập số tiền"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={inputValue || ""} // Ensure that value is not null
          InputProps={{
            endAdornment: inputValue && (
              <IconButton
                aria-label="clear input"
                onClick={() => setInputValue("")}
              >
                <CloseIcon />
              </IconButton>
            ),
          }}
          sx={{ width: "70%" }}
        />
        <Button
          disabled={inputValue === null}
          fullWidth
          variant="contained"
          color="primary"
          style={{ maxHeight: "56px", minHeight: "56px" }}
          onClick={handleSubmit}
          sx={{ width: "30%" }}
        >
          Lưu
        </Button>
      </Stack>
      <Box>
        <Typography variant="subtitle1">
          VND: {new Intl.NumberFormat("vi-VN").format(inputValue)}
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflow: "hidden",
        }}
      >
        {suggestMoneyList.map((suggestMoney, index) => (
          <Chip
            label={new Intl.NumberFormat("vi-VN").format(suggestMoney)}
            variant="outlined"
            key={index}
            onClick={() => setInputValue(suggestMoney)}
          >
            {suggestMoney.name}
          </Chip>
        ))}
      </Stack>
      <Typography>Ngày chi tiêu</Typography>
      <BasicDatePicker date={date} onChange={setDate} />
      <Typography>Loại chi tiêu</Typography>
      <Stack direction="row" spacing={1}>
        {categoryList.map((category, index) => (
          <Chip
            label={category.name}
            variant={
              category.id === selectedCategory.id ? "filled" : "outlined"
            }
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </Chip>
        ))}
      </Stack>

      <Typography>Nguồn tiền</Typography>
      {moneySourceList.map((moneySource, index) => (
        <Chip
          label={moneySource.name}
          variant={
            moneySource.id === selectedMoneySource.id ? "filled" : "outlined"
          }
          key={index}
          style={{ marginRight: "8px", marginBottom: "8px" }}
          onClick={() => setSelectedMoneySource(moneySource)}
        >
          {moneySource.name}
        </Chip>
      ))}
      <TextField
        label="Nhập ghi chú"
        variant="outlined"
        fullWidth
        onChange={(event) => setNote(event.target.value)}
        value={note || ""} // En
      />
      <Container maxWidth="sm">
        <List>
          {expenseList.map((expense, index) => (
            <ExpenseCard
              date={expense.date}
              money={expense.money}
              category={expense.category}
              moneySource={expense.moneySource}
              note={expense.note}
              key={index}
            />
          ))}
        </List>
      </Container>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackBar(false);
        }}
        message="Add expense successfully!"
      />
    </Box>
  );
}

export function BasicDatePicker({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker value={date} onChange={onChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
