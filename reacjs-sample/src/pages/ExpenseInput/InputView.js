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
  callDeleteMoneySource,
  callGetCategoryList,
  callGetDeleteExpense,
  callGetExpenseList,
  callGetMoneySource,
  callGetTodayExpenseList,
  callSubmitExpense,
} from "./ExpenseApi";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SnackMessageType, useSnackbar } from "../../components/SnackBar";
import { moneyFormat } from "../../utils/number_utils";

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
  const { openSnackbar } = useSnackbar();

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

    callGetMoneySource(
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
        openSnackbar("Thêm thành công", SnackMessageType.success);

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
    <Box sx={{ flexGrow: 1, m: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={8}>
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
                  Đang nhập (VND):{" "}
                  {new Intl.NumberFormat("vi-VN").format(inputValue)}
                </Typography>
                <Grid container spacing={1}>
                  {suggestMoneyList.map((suggestMoney, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={new Intl.NumberFormat("vi-VN").format(
                          suggestMoney,
                        )}
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
                <Grid container spacing={1}>
                  {categoryList.map((category, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={category.name}
                        variant={
                          category.id === selectedCategory.id
                            ? "filled"
                            : "outlined"
                        }
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.name}
                      </Chip>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2">Nguồn tiền</Typography>
                <Grid container spacing={1}>
                  {moneySourceList.map((moneySource, index) => (
                    <Grid item key={index}>
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
                    </Grid>
                  ))}
                </Grid>
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
          </Card>
        </Grid>
        <Grid xs={4}>
          <TodayExpenseList date={date} />
        </Grid>
      </Grid>
    </Box>
  );
}

export function BasicDatePicker({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={date} onChange={onChange} />
    </LocalizationProvider>
  );
}

export function TodayExpenseList({ date }) {
  const [list, setList] = useState([]);
  const { openSnackbar } = useSnackbar();

  const total = list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  useEffect(() => {
    callGetTodayExpenseList(
      date,
      (data) => {
        setList(data.reverse());
      },
      (err) => {},
      (done) => {},
    );
  }, [date]);

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
                list.splice(index, 1);
                setList([...list]);
              },
              () => {
                openSnackbar("Xoá thất bại", SnackMessageType.error);
              },
              () => {},
            );
          }}
        />
      ))}
    </Stack>
  );
}
