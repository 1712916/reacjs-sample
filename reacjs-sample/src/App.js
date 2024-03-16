import './App.css';
import Home from "./pages/Home/Home";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>

          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            My Expense
          </Typography>
        </Toolbar>
      </AppBar>
    <Home/>
    </div>
  );
}

export default App;
