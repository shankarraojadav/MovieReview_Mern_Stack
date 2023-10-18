import { useEffect, useRef, useState } from "react";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, TextField } from "@mui/material";
import "../../css/LiveSearch.css";


export const results = [
    {
      id: "1",
      avatar:
        "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      name: "John Doe",
    },
    {
      id: "2",
      avatar:
        "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      name: "Chandri Anggara",
    },
    {
      id: "3",
      avatar:
        "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      name: "Amin RK",
    },
    {
      id: "4",
      avatar:
        "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      name: "Edward Howell",
    },
    {
        id: "5",
        avatar:
          "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "John Doe",
      },
      {
        id: "6",
        avatar:
          "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Chandri Anggara",
      },
      {
        id: "7",
        avatar:
          "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Amin RK",
      },
      {
        id: "8",
        avatar:
          "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        name: "Edward Howell",
      },
  ];

export default function LiveSearch() {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const resultContainer = useRef();

  useEffect(() => {
    if (resultContainer.current) {
      resultContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [focusedIndex]);
  

  const handleOnFocus = () => {
    if(results.length) setDisplaySearch(true);
  };

  const handleOnBlur = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1)
  };

  const handleSelection = (profile) => {
    if (profile) {
      setSelectedProfile(profile.name);
      setDisplaySearch(false); 
      setFocusedIndex(-1); 
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value); // Update the search value as the user types
  };

  const handleKeyDown = ({ key }) => {
   
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    // move selection up and down
    if (key === "ArrowDown") {
        
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
        nextCount = (focusedIndex + results.length - 1) % results.length;
      }

    if(key === "Enter") return handleSelection(results[focusedIndex])

    setFocusedIndex(nextCount);
  };

 

  return (
    <div className="root">
      <TextField
        type="text"
        className="input"
        placeholder="Search profile"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={selectedProfile}
        onChange={handleChange}
      />
      {displaySearch && (
        <Paper className="results">
          <List className="results-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {results.map(({ id, name, avatar }, index) => (
              <ListItem
                key={id}
                ref={index === focusedIndex ? resultContainer : null}
                className={`list-item ${
                  index === focusedIndex ? "selected-list-item" : ""
                }`}
              >
                <Avatar src={avatar} alt={name} className="avatar" />
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
