import "./App.css";
import Home from "./pages/Home/Home";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LoginView from "./pages/Authen/Login";
import { useState } from "react";
import AuthView from "./pages/Authen/AuthenView";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return !isLogin ? (
    <AuthView
      onLogin={() => {
        setIsLogin(true);
      }}
    />
  ) : (
    <div className="App">
      <CssBaseline />
      <Stack>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" color="inherit" component="div">
              My Expense
            </Typography>
          </Toolbar>
        </AppBar>
        <Home />
      </Stack>
    </div>
  );
}

export default App;
