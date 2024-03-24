import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

export default function ExpenseCard({ expense }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {expense.date}
        </Typography>
        <Typography variant="h5" component="div">
          {expense.amount}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {expense.category.name + ` - ${expense.description ?? ""}`}
        </Typography>
        <Typography variant="body2">{expense.source.name}</Typography>
      </CardContent>
    </Card>
  );
}
