import { Box, Button, TextField } from "@mui/material";
import "../../css/forgetpass.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { forgetPassword } from "../../api/auth";
import { NotificationContext } from "../context/NotificationProvider";


const isValidEmail = ({email}) => {
  // console.log(email)
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email!" };

  return {ok: true}
}

function ForgetPassword() {
  const [email, setEmail] = useState();

  const { updateNotification } = useContext(NotificationContext);

  const handleChange = (e) => {
    setEmail({[e.target.name]: e.target.value})
    // console.log(email)
  }

  const handleSubmit =async () => {    
    if(!isValidEmail(email)) return updateNotification("error", "Invalid Email");
    const {error, message} =await forgetPassword(email);
    if(error) return updateNotification("error",error);
    updateNotification("success", message)
  }

  return (
    <Box>
      <Box className="forgetpass">
        <Box className="content-wrapper">
          <h1>Please Enter your Email</h1>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="forgetPass_inp"
          >
            <TextField
              className="forgetpass_inp"
              label="Email"
              placeholder="john@email.com"
              type="email"
              onChange={handleChange}
              name="email"
            />
            <Button onClick={handleSubmit} className="forgetPass_inp" variant="contained">
              Send Link
            </Button>
          </Box>
          <Box>
            <Button>
                <Link className="signin_link" to="/signin">Sign in</Link>
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

export default ForgetPassword;
