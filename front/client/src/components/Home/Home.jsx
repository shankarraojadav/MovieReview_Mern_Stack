import { Box, Button } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { authInfo } = useContext(AuthContext);
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate('/otp', {state: {user: authInfo.profile}})
  }

//   console.log(authInfo);
  return (
    <Box>
      {isLoggedIn && !isVerified ? (
        <Box sx={{textAlign:"center", background:"#DAC0A3"}}>
          <p>
            It looks like you haven't verified your account{" "}
            <span>
              <Button onClick={navigateToVerification}>Click Here to Verify Your Account</Button>
            </span>
          </p>
        </Box>
      ) : null}
    </Box>
  );
}

export default Home;
