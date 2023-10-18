import { Box, Button, TextField, Typography,Menu, MenuItem } from "@mui/material";
import {FiPlus} from "react-icons/Fi";
import { useState } from "react";
import MovieModal from "./MovieModal";


function Dashboard() {

  const [opon, setOpen] = useState(false);
  const [modalNum, setModalNum] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = (e) => {
    setOpen(true)
    setModalNum(e.target.value)
    handleClose()
  }



  return (
    <div style={{ overflow: "scroll", height: "100vh", width:"100%" }}>
      <style>
        {`
          /* Hide the scrollbars for webkit-based browsers (Chrome, Safari) */
          ::-webkit-scrollbar {
            width: 0.5em;
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
      </style>
      <Box sx={{display:"flex", flexDirection:"row" ,justifyContent:"space-around"}}>
       <TextField placeholder="Search Movies..."/>
       <Button onClick={handleClick} variant="outlined" sx={{alignItems:"center",padding:"5px"}}>Create<FiPlus />
       </Button>
       <Menu
       sx={{padding:"10vh"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem value={0} onClick={handleModal}>Movies</MenuItem>
        <MenuItem value={1} onClick={handleModal}>Actors</MenuItem>
      </Menu>
      </Box>
     <MovieModal opon={opon} setOpen={setOpen} modalNum={modalNum}/>
    </div>
  );
}

export default Dashboard;
