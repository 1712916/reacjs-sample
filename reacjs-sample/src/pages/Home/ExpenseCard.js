import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { deepPurple } from "@mui/material/colors";
import { getListFirstLetter, stringToColor } from "../../utils/string_utils";
import { Delete, DeleteOutlined } from "@mui/icons-material";

export default function ExpenseCard({ expense, showDate, onDelete }) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: stringToColor(expense.category.name) }}>
            {getListFirstLetter(expense.category.name).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={onDelete}>
            <DeleteOutlined></DeleteOutlined>
          </IconButton>
        }
        title={new Intl.NumberFormat("vi-VN").format(expense.amount)}
        subheader={`Ghi chú: ${expense.description}`}
      />
      <CardContent>
        {showDate && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dayjs(expense.date).format("DD/MM/YYYY")}
          </Typography>
        )}
        <Stack direction="row" spacing={1}>
          <Chip label={expense.category.name} variant="outlined" />
          <Chip label={expense.source.name} variant="outlined" />
        </Stack>
      </CardContent>
    </Card>
  );
}
