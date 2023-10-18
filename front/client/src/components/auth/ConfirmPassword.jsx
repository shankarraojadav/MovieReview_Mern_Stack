import { Box, Button, TextField } from "@mui/material";
import "../../css/confirmpassword.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { resetPassword, verifyResetPassToken } from "../../api/auth";
import { NotificationContext } from "../context/NotificationProvider";

function ConfirmPassword() {
  const [password, setPassword] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const { updateNotification } = useContext(NotificationContext);

  useEffect(() => {
    isValidToken()
  }, [])

  const isValidToken =async () => {
    const { error, valid } = await verifyResetPassToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/reset-password", { replace: true });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  if(isVerifying)
  return (
    <Box className="confirmpasspass">
    <Box className="content-wrapper">
      <h2>Please wait while we are verifying your token!</h2>
    </Box>
  </Box>
)

  if (!isValid)
  return (
    <Box className="confirmpasspass">
      <Box className="content-wrapper">
        <h1>
          Sorry the token is invalid!
        </h1>
      </Box>
    </Box>
  );

  const handleChange = (e) => {
    setPassword({...password, [e.target.name] : e.target.value})
    // console.log(password)
  }
  
  const pass1 = password.newpassword.trim();
  const pass2 = password.confirmpassword.trim();
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!pass1.trim()) {
      return updateNotification("error", "password must not be empty");
    }
    if(pass1.trim().length < 8) {
      return updateNotification("error", "Password must be 8 characters long")
    }

    if(pass1 !== pass2) {
      return updateNotification("error", "Password not matching!")
    }

    const {error, message} = await resetPassword({newpassword : pass1, userId: id, token});

    if(error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/signin",{ replace: true})
  }

  return (

      <Box className="confirmpasspass">
        <Box className="content-wrapper">
          <h2>Enter New Password</h2>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="confirmpass_inp"
          >
            <TextField
              className="confirmpass_inp"
              label="New Password"
              placeholder="*********"
              name="newpassword"
              onChange={handleChange}
            />
            <TextField
              className="confirmpass_inp"
              label="Confirm Password"
              placeholder="*********"
              name="confirmpassword"
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} className="confirmpass_inp" variant="contained">
             Submit
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
    
  );
}

export default ConfirmPassword;
