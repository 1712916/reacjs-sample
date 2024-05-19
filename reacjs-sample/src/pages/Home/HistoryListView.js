import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Container,
  IconButton,
  InputAdornment,
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
import { callGetExpenseList } from "../ExpenseInput/ExpenseApi";
import dayjs from "dayjs";
import { Close, Search } from "@mui/icons-material";

export default function HistoryListView() {
  const [expenseList, setExpenseList] = useState([]);
  const [searchInput, setSearchInput] = useState();

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    callGetExpenseList(
      (data) => {
        // data.sort((a, b) => {
        //   const d1 = dayjs(a.date, "YYYY-MM-DDTHH:mm:ss");
        //   const d2 = dayjs(b.date, "YYYY-MM-DDTHH:mm:ss");
        //   return d2.diff(d1);
        // });
        setExpenseList(data);
      },
      (err) => {},
      () => {}
    );
  }, []);

  return (
    <Container
      sx={{
        m: 2,
      }}>
      {" "}
                                                                        
      <Stack spacing={2}>
        <SearchBar
          input={searchInput || ""}
          onChange={handleChange}
          onEnter={() => {
            alert("Please select: " + searchInput);
          }}
          onClearInput={() => {
            setSearchInput(null);
          }}></SearchBar>
        <Typography variant="h4">Lịch sử</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ngày</TableCell>
                <TableCell align="right">Chi tiêu (VND)</TableCell>
                <TableCell align="right">Loại chi tiêu</TableCell>
                <TableCell align="right">Nguồn tiền</TableCell>
                <TableCell align="right">Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseList.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    {dayjs(row.date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("vi-VN").format(row.amount)}
                  </TableCell>
                  <TableCell align="right">{row.category.name}</TableCell>
                  <TableCell align="right">{row.source.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}

function SearchBar({ input, onChange, onEnter, onClearInput }) {
  return (
    <TextField
      value={input}
      onChange={onChange}
      placeholder="Nhập ghi chú"
      InputProps={{
        sx: {
          borderRadius: 20,
        },
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: input && (
          <IconButton aria-label="clear input" onClick={onClearInput}>
            <Close />
          </IconButton>
        ),
      }}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          onEnter();
        }
      }}
    />
  );
}
