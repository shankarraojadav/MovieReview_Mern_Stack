import { Box, TextField, Typography, Button, FormControlLabel, Checkbox, Stack } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import Tags from "./Tags";
import LiveSearch from "./LiveSearch";

export default function MovieForm () {
    return (
        <Stack direction="row">
            <Box>
            <TextField label="Title" placeholder="KGF" />
            <TextField label="Story Line" placeholder="Movie StoryLine..." />
            <Tags />
            <Box>
                <Typography variant="h6">Add Cast & Crew</Typography>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Lead Actor"
                />
                <TextField label="Search profile" />
                <Box>
                    <Typography>as</Typography>
                    <TextField placeholder="Role" />
                    <Button>Add</Button>
                </Box>
            </Box>
            <LiveSearch />
            <TextField placeholder="Search profile" label="Writers" />
            <Typography>Release Date:</Typography>
            <TextField type="date" />
            </Box>
            <Box>
                <FileUploader>
                    <Box sx={{border:"1px solid black", borderRadius:"25%", width:"20vh", height:"20vh"}}>

                    </Box>
                </FileUploader>
            </Box>
        </Stack>
    )
}
