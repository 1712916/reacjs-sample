import InputView from "../ExpenseInput/InputView";
import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";
import DashboardView from "./DashBoardView";
import HistoryListView from "./HistoryListView";

export default function Home() {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <InputView />
      <Box sx={{ flexGrow: 1 }}>
        <HistoryListView />
      </Box>
    </Stack>
  );
}
