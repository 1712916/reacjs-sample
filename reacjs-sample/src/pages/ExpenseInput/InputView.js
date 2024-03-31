import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  FormControlLabel,
  Grid,
  Grow,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getSuggestMoneyList } from "../../utils/suggest_money";
import {
  callGetCategoryList,
  callGetMoneySource,
  callSubmitExpense,
} from "./ExpenseApi";
import { SnackMessageType, useSnackbar } from "../../components/SnackBar";
import { BasicDatePicker } from "../../components/BasicDatePicker";
import { StarBorder } from "@mui/icons-material";
import { getSuggestExpenseList } from "../Home/SettingView";
import SuggestExpenseCard from "./SuggestExpenseCard";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function InputView({ date, setDate, onAddSuccess }) {
  const [inputValue, setInputValue] = useState(null);
  const [suggestMoneyList, setSuggestMoneyList] = useState([]);
  const [suggestExpenseList, setSuggestExpenseList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [moneySourceList, setMoneySourceList] = useState([]);
  const [selectedMoneySource, setSelectedMoneySource] = useState();
  const [note, setNote] = useState();
  const { openSnackbar } = useSnackbar();
  const [checked, setChecked] = React.useState(false);

  const handleSuggestSwitchChange = () => {
    setChecked((prev) => !prev);
  };

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

    setSuggestExpenseList(getSuggestExpenseList() ?? []);
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
    callAddExpense(expense);
  };

  const callAddExpense = (expense) => {
    callSubmitExpense(
      expense,
      (res) => {
        openSnackbar("Thêm thành công", SnackMessageType.success);
        onAddSuccess(res);
        setInputValue(null);
        setNote(null);
      },
      (err) => {
        alert(err);
      },
      () => {}
    );
  };

  const handleAddExpenseFromSuggestion = (suggestExpense) => {
    const expense = {
      amount: suggestExpense.amount,
      category: suggestExpense.category,
      type: 0,
      description: null,
      source: suggestExpense.source,
      date: date.format("YYYY-MM-DDTHH:mm:ss"),
    };
    // alert(JSON.stringify(expense));
    callAddExpense({
      amount: suggestExpense.amount,
      category: suggestExpense.category,
      type: 0,
      description: null,
      source: suggestExpense.source,
      date: date.format("YYYY-MM-DDTHH:mm:ss"),
    });
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
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2">Gợi ý</Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleSuggestSwitchChange}
                />
              }
            />
          </Stack>
          <Collapse in={checked} timeout="auto" unmountOnExit>
            <Grid container spacing={1}>
              {suggestExpenseList.map((e, i) => (
                <Grid item xs={4}>
                  <SuggestExpenseCard
                    expense={e}
                    onSelect={() => handleAddExpenseFromSuggestion(e)}
                  />
                </Grid>
              ))}
            </Grid>
            {/* <Box display="flex" overflow="scroll" p={1}>
              <Stack direction="row" spacing={2}>
                {suggestExpenseList.map((e, i) => (
                  <SuggestExpenseCard expense={e} />
                ))}
              </Stack>
            </Box> */}
          </Collapse>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Ngày chi tiêu</Typography>
          <Box width="50%">
            <BasicDatePicker date={date} onChange={setDate} />
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Loại chi tiêu</Typography>
          <Droppable droppableId="category" isDropDisabled={false}>
            {(provided) => (
              <Grid
                container
                spacing={1}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {categoryList.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={index}>
                    {(provided) => (
                      <Grid
                        item
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Chip
                          label={category.name}
                          variant={
                            category.id === selectedCategory.id
                              ? "filled"
                              : "outlined"
                          }
                          key={index}
                          onClick={() => setSelectedCategory(category)}>
                          {category.name}
                        </Chip>
                      </Grid>
                    )}
                  </Draggable>
                ))}
              </Grid>
            )}
          </Droppable>
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
  );
}

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);
