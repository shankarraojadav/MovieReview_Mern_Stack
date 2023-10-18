import { Box, TextField, Chip } from "@mui/material";
import { useState } from "react";


export default function Tags() {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log(tags)
  const handleInputKeyUp = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      addTag(inputValue.trim());
      setInputValue("");
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <Box>
      <TextField
        label="Tags"
        placeholder="Enter tags and press Enter or comma"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        InputProps={{
          startAdornment: tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => removeTag(tag)}
              variant="outlined"
            />
          )),
        }}
      />
    </Box>
  );
}
