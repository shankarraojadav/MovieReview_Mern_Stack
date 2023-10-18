import { Box, TextField, Typography } from "@mui/material";
import { BsFillSunFill } from "react-icons/bs"
import "../../css/navbar.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Navbar () {
    const { toggle } = useContext(ThemeContext);

    const { authInfo, handleLogout } = useContext(AuthContext);
    const {isLoggedIn} = authInfo;

    console.log(isLoggedIn)

    const Logout = () => {
       handleLogout()
    }

    return (
        <Box className="navbar">
            <Box className="logo">
                <img src="./logo.png" alt="logo" />
            </Box>
            <Box>
                <ul className="navbar_items">
                    <li>
                        <button onClick={toggle}><BsFillSunFill /></button>
                    </li>
                    <li>
                        <input   placeholder="Search..." />
                    </li>
                    <li >
                       {
                        isLoggedIn? <Typography onClick={Logout}>Logout</Typography>:
                        <Link className="link" to="/signin" >Login</Link>
                       }
                    </li>
                </ul>
            </Box>
        </Box>
    )
}


export default Navbar;