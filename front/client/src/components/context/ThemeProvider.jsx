import { createContext, useEffect } from "react";
import "../../css/navbar.css";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

const ThemeProvider = ({ children }) => {
    const toggle = () => {
        const oldTheme = localStorage.getItem("theme");
        const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

        document.documentElement.classList.remove(oldTheme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme)
    };

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if(!theme) document.documentElement.classList.add(defaultTheme);
        else document.documentElement.classList.add(theme);
    })

    return (
        <ThemeContext.Provider value={{toggle}}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;