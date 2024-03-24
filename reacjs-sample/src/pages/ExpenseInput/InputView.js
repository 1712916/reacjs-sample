import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  makeStyles,
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
    <Card
      sx={{
        m: 2,
        p: 2,
        // backgroundColor: "#c0d7f1",
        // p: "16px",
        // alignItems: "center",
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8} sm={9} md={10} lg={10} xl={10}>
              <TextField
                flex={8}
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
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
              <Button
                flex={2}
                disabled={inputValue === null}
                fullWidth
                variant="contained"
                color="primary"
                style={{ maxHeight: "56px", minHeight: "56px" }}
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Đang nhập (VND): {new Intl.NumberFormat("vi-VN").format(inputValue)}
          </Typography>
          <Grid container spacing={1}>
            {suggestMoneyList.map((suggestMoney, index) => (
              <Grid item key={index}>
                <Chip
                  label={new Intl.NumberFormat("vi-VN").format(suggestMoney)}
                  variant="outlined"
                  key={index}
                  onClick={() => setInputValue(suggestMoney)}
                >
                  {suggestMoney.name}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Ngày chi tiêu</Typography>
          <Box width="50%">
            <BasicDatePicker date={date} onChange={setDate} />
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Loại chi tiêu</Typography>
          <Stack direction="row" spacing={2}>
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
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Nguồn tiền</Typography>
          <Stack direction="row" spacing={1}>
            {moneySourceList.map((moneySource, index) => (
              <Chip
                label={moneySource.name}
                variant={
                  moneySource.id === selectedMoneySource.id
                    ? "filled"
                    : "outlined"
                }
                key={index}
                style={{ marginRight: "8px", marginBottom: "8px" }}
                onClick={() => setSelectedMoneySource(moneySource)}
              >
                {moneySource.name}
              </Chip>
            ))}
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Ghi chú</Typography>
          <TextField
            id="standard-multiline-flexible"
            label="Nhập ghi chú"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            onChange={(event) => setNote(event.target.value)}
            value={note || ""} // En
          />
        </Stack>
      </Stack>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackBar(false);
        }}
        message="Add expense successfully!"
      />
    </Card>
  );
}

export function BasicDatePicker({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={date} onChange={onChange} />
    </LocalizationProvider>
  );
}
