import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { moneyFormat } from "../../utils/number_utils";

export default function SuggestExpenseCard({ expense, onSelect }) {
  return (
    <Card>
      <CardHeader title={moneyFormat(expense.amount)} />
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label={expense.category.name} variant="outlined" />
          <Chip label={expense.source.name} variant="outlined" />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onSelect}>
          Chọn
        </Button>
      </CardActions>
    </Card>
  );
}
