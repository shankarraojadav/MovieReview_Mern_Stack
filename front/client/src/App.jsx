import { Stack } from "@mui/material";
import Navbar from "./components/user/Navbar";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/auth/forgetPassword";
import EmailVerOtp from "./components/auth/EmailVerOtp";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import NotFound from "./components/user/NotFound";
import Home from "./components/Home/Home";
import { AuthContext } from "./components/context/AuthProvider";
import { useContext, } from "react";
import AdminNavigator from "./navigator/AdminNavigator";

function App() {

  const {authInfo} = useContext(AuthContext);
  const isAdmin = authInfo.profile?.role === 'admin';


  if (isAdmin) {
    return <AdminNavigator />;
  }
  

  return (
    <Stack>
      <Navbar />

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpass" element={<ForgetPassword />} />
        <Route path="/otp" element={<EmailVerOtp />} />
        <Route path="/reset-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Stack>
  );
}

export default App;
