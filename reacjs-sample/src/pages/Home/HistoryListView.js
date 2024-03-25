import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
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
    <Container
      sx={{
        m: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Lịch sử</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ngày</TableCell>
                <TableCell align="right">Chi tiêu</TableCell>
                <TableCell align="right">Loại chi tiêu</TableCell>
                <TableCell align="right">Nguồn tiền</TableCell>
                <TableCell align="right">Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseList.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
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
