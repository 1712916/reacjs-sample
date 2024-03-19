import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { callLogin } from "./AuthenApi";

export default function LoginView({ onLogin, onToggleView }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const requiresAreFilled = account.length > 0 && password.length > 0;

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    callLogin(account, password, onLogin, (errorMessage) => {
      setErrorMessage(errorMessage);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "16px",
      }}
    >
      <Box
        sx={{
          width: "50%",
          borderRadius: 1,
          bgcolor: "lightblue",
          textAlign: "center",
          lineHeight: "200px",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h5">Login</Typography>
          <TextField
            label="Account"
            value={account}
            onChange={handleAccountChange}
            type="text"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errorMessage && (
            <Alert variant="outlined" severity="error">
              {errorMessage}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!requiresAreFilled}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button
            type="submit"
            onClick={() => {
              console.log(`LOL: ${onToggleView()}`);
            }}
          >
            Register now!
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
