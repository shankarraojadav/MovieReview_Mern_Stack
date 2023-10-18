import { Box, Button, TextField } from "@mui/material";
import "../../css/signup.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { NotificationContext } from "../context/NotificationProvider";

const validateUserInfo = (userInfo) => {
  const { name, email, password } = userInfo;

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  if (!name.trim()) return { ok: false, error: "Name is missing" };
  if (/^[a-z A-Z]+$/.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email!" };


  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password length must be between > 8 & < 20" };

  return { ok: true };
};

function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo; 

  const { updateNotification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) updateNotification('error',error);

    const response = await createUser(userInfo);
    if (response.error) updateNotification("error",response.error);

    navigate("/otp", { state: { user: response.user }, replace: true });
   
  };

  useEffect(() => {
    if(isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  return (
    <Box className="sign_up">
      <Box className="content-wrapper">
        <h1>Sign Up</h1>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          className="signup_inp"
        >
          <TextField
            className="signup_inp"
            label="Name"
            placeholder="john@email.com"
            name="name"
            type="text"
            onChange={(e) => handleSignup(e)}
          />
          <TextField
            className="signup_inp"
            label="Email"
            placeholder="john@email.com"
            name="email"
            type="email"
            onChange={(e) => handleSignup(e)}
          />
          <TextField
            className="signup_inp"
            label="Password"
            placeholder="*******"
            name="password"
            type="password"
            onChange={(e) => handleSignup(e)}
          />
          <Button
            onClick={handleSubmit}
            className="signup_inp"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
        <Box>
          <Button>
            <Link className="forget_link" to="/forgetpass">
              Forget Password
            </Link>
          </Button>
          <Button>
            <Link className="signin_link" to="/signin">
              Sign in
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
