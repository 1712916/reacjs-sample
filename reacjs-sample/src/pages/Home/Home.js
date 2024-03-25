import InputView from "../ExpenseInput/InputView";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardView from "./DashBoardView";
import HistoryListView from "./HistoryListView";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddCard, Category, ManageSearch, PieChart } from "@mui/icons-material";
import { ScreenType } from "../ScreenType";
import InputCategoryView from "../ExpenseInput/InputCategoryView";
import InputMoneySourceView from "../ExpenseInput/InputMonetSourceView";
import { SnackbarProvider, CustomSnackbar } from "../../components/SnackBar";

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

const drawerWidth = 240;

export function LoggedView({ logout }) {
  const [viewType, setViewType] = useState(ScreenType.addExpenseView);

  function renderView() {
    switch (viewType) {
      case ScreenType.chartView:
        return <InputView />;
      case ScreenType.tableView:
        return <HistoryListView />;
      case ScreenType.addExpenseView:
        return <InputView />;
      case ScreenType.addCategoryView:
        return <InputCategoryView />;
      case ScreenType.addMoneySourceView:
        return <InputMoneySourceView />;
      default:
        return <InputView />;
    }
  }

  return (
    <SnackbarProvider>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                My Expense
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  logout();
                  localStorage.removeItem("token");
                }}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem key={"Expense"} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setViewType(ScreenType.addExpenseView);
                    }}
                  >
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add New"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Category"} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setViewType(ScreenType.addCategoryView);
                    }}
                  >
                    <ListItemIcon>
                      <Category />
                    </ListItemIcon>
                    <ListItemText primary={"Category"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"MoneySource"} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setViewType(ScreenType.addMoneySourceView);
                    }}
                  >
                    <ListItemIcon>
                      <AddCard />
                    </ListItemIcon>
                    <ListItemText primary={"Money Source"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Chart"} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setViewType(ScreenType.chartView);
                    }}
                  >
                    <ListItemIcon>
                      <PieChart />
                    </ListItemIcon>
                    <ListItemText primary={"Chart"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"Table"} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setViewType(ScreenType.tableView);
                    }}
                  >
                    <ListItemIcon>
                      <ManageSearch />
                    </ListItemIcon>
                    <ListItemText primary={"Table"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}
          >
            <Toolbar />
            {renderView()}
          </Box>
        </Box>
        <Box>{/*<CustomSnackbar />*/}</Box>
      </div>
    </SnackbarProvider>
  );
}
