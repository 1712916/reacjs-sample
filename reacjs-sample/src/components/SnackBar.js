import React, { createContext, useContext, useState } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const SnackbarContext = createContext({});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(SnackMessageType.info);
  const openSnackbar = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const value = {
    openSnackbar: openSnackbar,
    closeSnackbar: closeSnackbar,
  };

  function getBackgroundColor() {
    return SnackBackgroundColor[severity];
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={600000}
        onClose={closeSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SnackbarContent
          message={message}
          style={{
            backgroundColor: getBackgroundColor(),
          }}
          action={
            <IconButton size="small" color="inherit" onClick={closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const SnackMessageType = {
  error: "error",
  info: "info",
  success: "success",
};

const SnackBackgroundColor = {
  error: "#f44336",
  info: "#4caf50",
  success: "#4caf50",
};

// export const CustomSnackbar = () => {
//   const { open, message, severity, closeSnackbar } = useSnackbar();
//
//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={600000}
//       onClose={closeSnackbar}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "left",
//       }}
//     >
//       <SnackbarContent
//         message={message}
//         style={{
//           backgroundColor: severity === "error" ? "#f44336" : "#4caf50",
//         }}
//         action={
//           <IconButton size="small" color="inherit" onClick={closeSnackbar}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         }
//       />
//     </Snackbar>
//   );
// };
