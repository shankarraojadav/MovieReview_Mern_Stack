import { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "error", // Default type
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const updateNotification = (type, message) => {
    setNotification({ open: true, message, type });
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{
          marginTop: "13vh", 
          "@media (maxWidth: 600px)": {
            marginTop: "30vh", 
          },
          "@media (maxWidth: 480px)": {
            marginTop: "50vh",
          },
        }}
      >
        <Alert severity={notification.type} onClose={handleClose}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
