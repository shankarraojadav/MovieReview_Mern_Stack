import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import "../../css/MovieModal.css";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/Fi";
import {NotificationContext} from "../context/NotificationProvider"
import { uploadTrailer } from "../../api/movie";
import "../../css/uploadProgress.css";
import MovieForm from "./MovieForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


// trailer selector

const TrailerSelector = ({ videoSelected, setVideoSelected, setUploadProgress, setVideoUploaded, videoUploaded, uploadPro }) => {
  const [videoInfo, setVideoInfo] = useState({});
  const {updateNotification} = useContext(NotificationContext);

  const handleUploadTrailer =async (formData) => {
    const {error, url, public_id} = await uploadTrailer(formData, setUploadProgress);
    if(error) return updateNotification("error", error);
    setVideoUploaded(true);
    setVideoInfo({url, public_id});
  }

  

  const handleChange = (file) => {
    if(file) setVideoSelected(true);
    const formData =new FormData();
    formData.append('video', file);
   
    handleUploadTrailer(formData)
  }

  
  const handleTypeError = (error) => {
    updateNotification("error", error)
  }

  return (
    <Box sx={{display:"flex",justifyContent:"center", mt:"30vh"}}>
            <FileUploader handleChange={handleChange} onTypeError={handleTypeError}  types={['mp4', 'avi']}>
              <Box sx={{
                width:"48",textAlign:"center", cursor:"pointer" ,height:"48", border:"1px solid gray", padding:"20px", borderRadius:"25%"
              }}>
                <FiUploadCloud size={80} />
                <Typography>Drop your Files here</Typography>
              </Box>
            </FileUploader>
          </Box>
  )
}

// upload progress

const UploadProgress = ({uploadPro}) => {
  console.log("upload progress",uploadPro)
  return (
    <div className="upload-progress-container">
      
      <div className="progress-bar">
        <div className="progress" style={{ width: uploadPro + "%" }}>
          {`${Math.round(uploadPro)}%`} 
        </div>
      </div>
      <h6 className="upload-progress-title">processing wait...</h6>
    </div>
  );
};

// modal
export default function MovieModal({ opon, setOpen, modalNum }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [uploadPro, setUploadProgress] = useState();
  const [videoUploaded, setVideoUploaded] = useState(false);
 

  const handleOpen = () => setOpen(true);

  const handleClose = () =>{
    setOpen(false)
    setUploadProgress(0)
    setVideoUploaded(false)
    setVideoSelected(false)
  };
  return (
    <div>
      <Modal
        open={opon}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          {/* {videoSelected && !videoUploaded && (
            <UploadProgress uploadPro={uploadPro} />
          )}
          {!videoSelected && (
            <TrailerSelector
              videoSelected={videoSelected}
              setVideoSelected={setVideoSelected}
              setUploadProgress={setUploadProgress}
              setVideoUploaded={setVideoUploaded}
              videoUploaded={videoUploaded}
            />
          )} */}
          {/* {videoUploaded && <MovieForm />} */}
          <MovieForm />
        </Box>
      </Modal>
    </div>
  );
}
