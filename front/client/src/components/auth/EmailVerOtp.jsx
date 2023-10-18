import { Box, Button, TextField } from "@mui/material";
import "../../css/forgetpass.css";
import { Link } from "react-router-dom";
import "../../css/emailverotp.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerifiactionToken, verifyOtp } from "../../api/auth";
import { NotificationContext } from "../context/NotificationProvider";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";


const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

const EmailOtp = 6;

function EmailVerOtp() {
  const [otp, setOtp] = useState(new Array(EmailOtp).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const { isAuth, authInfo } = useContext(AuthContext);

  const {isLoggedIn, profile} = authInfo;
  const isVerified = profile?.isVerified;

  const { updateNotification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const { state } = useLocation();

  const user = state?.user;

  // console.log("user", user)

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.lenght);
    setOtp([...newOtp]);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      focusPrevInputField(index);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("*");
  }, [user]);

  // if(!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error","invalid OTP");
    }
    const { error, message,user: userResponse} = await verifyOtp({ OTP: otp.join(""), userId: user.id });
    if(error) updateNotification("error", error);
    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    if(!user) navigate("/not-found")
    if(isLoggedIn && isVerified) {
      navigate("/")
    }
  }, [isLoggedIn, isVerified])

  // Resend OTP

  const handleOtpResend =async () => {
   const {error, message} = await resendEmailVerifiactionToken(user.id);

   if(error) return updateNotification("error", error)

   updateNotification("success", message)
  }

  return (
    <Box>
      <Box className="emailver">
        <Box className="content-wrapper">
          <h1>Enter OTP that you have recieved in your Email</h1>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="emailver_inp"
          >
            <Box className="otp_boxes">
              {otp.map((_, index) => {
                return (
                  <Box key={index} className="otp_inp">
                    <input
                      ref={activeOtpIndex === index ? inputRef : null}
                      value={otp[index] || ""}
                      type="number"
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="emailver_inp"
                      style={{ textAlign: "center" }}
                    />
                  </Box>
                );
              })}
            </Box>
            <Button
              onClick={handleSubmit}
              className="emailver_inp"
              variant="contained"
            >
             Submit
            </Button>
          </Box>
          <Box>
          <Button onClick={handleOtpResend}>
                Resend OTP
            </Button>
            <Button>
              <Link className="signin_link" to="/signin">
                Sign in
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

export default EmailVerOtp;
