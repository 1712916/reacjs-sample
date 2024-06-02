import InputView from "../ExpenseInput/InputView";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
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
import HistoryListView from "./HistoryListView";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AddCard,
  Category,
  ManageSearch,
  PieChart,
  Settings,
} from "@mui/icons-material";
import { ScreenType } from "../ScreenType";
import InputCategoryView from "../ExpenseInput/InputCategoryView";
import InputMoneySourceView from "../ExpenseInput/InputMoneySourceView";
import { SnackbarProvider } from "../../components/SnackBar";
import ChartView from "./ChartView";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import InputExpenseView from "../ExpenseInput/InputExpenseView";
import SettingView from "./SettingView";
import ChartView2 from "./ChartView2";

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
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/expense":
        setViewType(ScreenType.addExpenseView);
        break;
      case "/category":
        setViewType(ScreenType.addCategoryView);
        break;
      case "/money-source":
        setViewType(ScreenType.addMoneySourceView);
        break;
      case "/chart":
        setViewType(ScreenType.chartView);
        break;
      case "/chart/category":
        setViewType(ScreenType.chartViewCategory);
        break;
      case "/history":
        setViewType(ScreenType.tableView);
        break;
      default:
        setViewType(ScreenType.addExpenseView);
    }
  }, [location.pathname]);

  const viewTypeList = [
    {
      type: ScreenType.addExpenseView,
      title: "Thêm chi tiêu",
      href: "/expense",
      icon: <AddCircleOutlineIcon />,
      onClick: () => {
        setViewType(ScreenType.addExpenseView);
      },
    },
    {
      type: ScreenType.addCategoryView,
      title: "Thêm loại chi tiêu",
      href: "/category",
      icon: <Category />,
      onClick: () => {
        setViewType(ScreenType.addCategoryView);
      },
    },
    {
      type: ScreenType.addMoneySourceView,
      title: "Thêm nguồn tiền",
      href: "/money-source",
      icon: <AddCard />,
      onClick: () => {
        setViewType(ScreenType.addMoneySourceView);
      },
    },
    {
      type: ScreenType.chartView,
      title: "Biểu đồ",
      href: "/chart",
      icon: <PieChart />,
      onClick: () => {
        setViewType(ScreenType.chartView);
      },
    },
    {
      type: ScreenType.chartViewCategory,
      title: "Biểu đồ theo loại chi tiêu",
      href: "/chart/category",
      icon: <PieChart />,
      onClick: () => {
        setViewType(ScreenType.chartViewCategory);
      },
    },
    {
      type: ScreenType.tableView,
      title: "Lịch sử",
      href: "/history",
      icon: <ManageSearch />,
      onClick: () => {
        setViewType(ScreenType.tableView);
      },
    },
    {
      type: ScreenType.settingView,
      title: "Cài đặt",
      href: "/setting",
      icon: <Settings />,
      onClick: () => {
        setViewType(ScreenType.settingView);
      },
    },
  ];

  return (
    <SnackbarProvider>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ flexGrow: 1 }}>
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
                color="inherit">
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
            }}>
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {viewTypeList.map((view) => (
                  <ListItem key={view.type} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={view.href}
                      selected={view.type === viewType}
                      onClick={view.onClick}>
                      <ListItemIcon>{view.icon}</ListItemIcon>
                      <ListItemText primary={view.title} />
                    </ListItemButton>
                    <Link to={view.href}></Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<InputExpenseView />} />
              <Route path="/expense" element={<InputExpenseView />} />
              <Route path="/category" element={<InputCategoryView />} />
              <Route path="/money-source" element={<InputMoneySourceView />} />
              <Route path="/chart" element={<ChartView />} />
              <Route path="/chart/category" element={<ChartView2 />} />
              <Route path="/history" element={<HistoryListView />} />
              <Route path="/setting" element={<SettingView />} />
            </Routes>
            {/*{renderView()}*/}
          </Box>
        </Box>
        <Box>{/*<CustomSnackbar />*/}</Box>
      </div>
    </SnackbarProvider>
  );
}
