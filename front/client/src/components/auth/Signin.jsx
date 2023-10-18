import { Box, Button, TextField } from "@mui/material";
import "../../css/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";


const validateUserInfo = (userInfo) => {
  const { email, password } = userInfo;

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email!" };


  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password length must be between > 8 & < 20" };

  return { ok: true };
};


function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useContext(NotificationContext);

  const { handleLogin, authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo)
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if(!ok) updateNotification("error", error);
    const response =await handleLogin(userInfo.email, userInfo.password);
    // console.log(response)
  }

//  useEffect(() => {
//   if(isLoggedIn) {
//     navigate("/")
//   }
//  }, [isLoggedIn])
  return (
    <Box>
      <Box className="sign_in">
        <Box className="content-wrapper">
          <h1>Sign in</h1>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="signin_inp"
          >
            <TextField
              className="signin_inp"
              label="Email"
              placeholder="john@email.com"
              name="email"
              type="email"
              onChange={handleChange}
            />
            <TextField
              className="signin_inp"
              label="Password"
              placeholder="*******"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} className="signin_inp" variant="contained">
              Sign in
            </Button>
          </Box>
          <Box>
            <Button>
            <Link className="forget_link" to="/forgetpass">
                Forget Password
              </Link>
            </Button>
            <Button>
              <Link className="signup_link" to="/signup">
                Sign Up
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signin;
