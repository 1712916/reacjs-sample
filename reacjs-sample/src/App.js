import "./App.css";
import Home from "./pages/Home/Home";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LoginView from "./pages/Authen/Login";
import { useEffect, useState } from "react";
import AuthView from "./pages/Authen/AuthenView";
import { setToken } from "./api/ApiUtils";
import {
  AccountCircle,
  ManageAccountsOutlined,
  ManageSearch,
  PieChart,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputView from "./pages/ExpenseInput/InputView";
import HistoryListView from "./pages/Home/HistoryListView";

const drawerWidth = 240;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      setIsLogin(true);
    }
  }, []);

  return !isLogin ? (
    <AuthView
      onLogin={() => {
        setIsLogin(true);
      }}
    />
  ) : (
    <LoggedView logout={() => setIsLogin(false)} />
  );
}

const screenEnum = {
  addView: 0,
  chartView: 1,
  tableView: 2,
};
export default App;

function LoggedView({ logout }) {
  const [viewType, setViewType] = useState(screenEnum.addView);

  function renderView() {
    switch (viewType) {
      case screenEnum.chartView:
        return <InputView />;
      case screenEnum.tableView:
        return <HistoryListView />;
      case screenEnum.addView:
        return <InputView />;
    }
  }

  return (
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
            <ListItem key={"Add New"} disablePadding>
              <ListItemButton
                onClick={() => {
                  setViewType(screenEnum.addView);
                }}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Add New"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Chart"} disablePadding>
              <ListItemButton
                onClick={() => {
                  setViewType(screenEnum.chartView);
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
                  setViewType(screenEnum.tableView);
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
  );
}
