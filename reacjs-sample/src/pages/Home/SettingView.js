import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
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
import ExpenseCard from "./ExpenseCard";
import {
  callDeleteExpense,
  callGetExpenseList,
} from "../ExpenseInput/ExpenseApi";
import dayjs from "dayjs";
import { useSnackbar } from "../../components/SnackBar";
import { Close } from "@mui/icons-material";
import { moneyFormat } from "../../utils/number_utils";
import { getSuggestMoneyList } from "../../utils/suggest_money";
import { callGetCategoryList } from "../ExpenseInput/CategoryApi";
import { callGetMoneySource } from "../ExpenseInput/MoneySourceApi";

const suggest_expenses_key = "suggest_expenses";

export function getSuggestExpenseList() {
  var expenses = localStorage.getItem(suggest_expenses_key);
  if (expenses !== null) {
    return JSON.parse(expenses);
  }
  return null;
}

export default function SettingView() {
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    var expenses = localStorage.getItem(suggest_expenses_key);
    if (expenses !== null) {
      setExpenseList(JSON.parse(expenses));
    }
  }, []);

  function storageExpenseList(expenseList) {
    setExpenseList(expenseList);
    localStorage.setItem(suggest_expenses_key, JSON.stringify(expenseList));
  }

  return (
    <Box sx={{ flexGrow: 1, m: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={8}>
          <InputView
            onAddSuccess={(expense) => {
              storageExpenseList([expense, ...expenseList]);
            }}
          />
        </Grid>
        <Grid xs={4}>
          <TodayExpenseList
            list={expenseList}
            onRemoveAtIndex={(index) => {
              expenseList.splice(index, 1);
              storageExpenseList([...expenseList]);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function InputView({ onAddSuccess }) {
  const [inputValue, setInputValue] = useState(null);
  const [suggestMoneyList, setSuggestMoneyList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [moneySourceList, setMoneySourceList] = useState([]);
  const [selectedMoneySource, setSelectedMoneySource] = useState();
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
      () => {}
    );

    callGetMoneySource(
      (sources) => {
        setMoneySourceList(sources);
        setSelectedMoneySource(sources[0]);
      },
      () => {}
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
      type: 0,
      source: selectedMoneySource,
    };

    onAddSuccess(expense);
  };

  return (
    <Card
      sx={{
        m: 2,
        p: 2,
        // backgroundColor: "#c0d7f1",
        // p: "16px",
        // alignItems: "center",
      }}>
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
                      onClick={() => setInputValue(null)}>
                      <Close />
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
                onClick={handleSubmit}>
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
                  onClick={() => setInputValue(suggestMoney)}>
                  {suggestMoney.name}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Loại chi tiêu</Typography>
          <Grid container spacing={1}>
            {categoryList.map((category, index) => (
              <Grid item key={index}>
                <Chip
                  label={category.name}
                  variant={
                    category.id === selectedCategory.id ? "filled" : "outlined"
                  }
                  key={index}
                  onClick={() => setSelectedCategory(category)}>
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
                  onClick={() => setSelectedMoneySource(moneySource)}>
                  {moneySource.name}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
}

function TodayExpenseList({ date, list, onRemoveAtIndex }) {
  const total = list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h5">{moneyFormat(total)}</Typography>
      //todo: add drag and drop view here
      {/* {list.map((e, index) => (
        <ExpenseCard
          expense={e}
          onDelete={() => {
            onRemoveAtIndex(index);
          }}
        />
      ))} */}
    </Stack>
  );
}
