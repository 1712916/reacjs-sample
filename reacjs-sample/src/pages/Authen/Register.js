import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { callRegister } from "./AuthenApi";
import { validateEmail } from "../../utils/string_utils";
import LoadingButton from "@mui/lab/LoadingButton";

export default function RegisterView({ onRegister, onToggleView }) {
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const requiresAreFilled =
    account.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    email.length > 0;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage([]);
    setIsRegisterSuccess(false);

    var errorList = [];

    //validate password
    if (password !== confirmPassword) {
      errorList.push("Password not match");
    }

    if (!validateEmail(email)) {
      errorList.push("Email is not valid");
    }

    if (errorList.length > 0) {
      setErrorMessage(errorList);
      return;
    }

    setLoading(true);

    callRegister(
      account,
      password,
      email,
      () => {
        setIsRegisterSuccess(true);
        onRegister();
      },
      (e) => {
        setErrorMessage([e]);
      },
    ).finally(() => {
      setLoading(false);
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
          <Typography variant="h5">Register</Typography>
          <TextField
            label="Account"
            value={account}
            onChange={handleAccountChange}
            type="text"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {errorMessage.map((e, index) => (
            <Alert variant="outlined" severity="error">
              {e}
            </Alert>
          ))}
          {isRegisterSuccess && (
            <Alert variant="outlined" severity="success">
              Your register is successes.
            </Alert>
          )}
          <LoadingButton
            loading={isLoading}
            variant="contained"
            disabled={!requiresAreFilled}
            onClick={handleSubmit}
            loadingPosition="start"
          >
            Register
          </LoadingButton>

          <Button onClick={onToggleView}>Login now!</Button>
        </Stack>
      </Box>
    </div>
  );
}
