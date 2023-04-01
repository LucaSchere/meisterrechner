import React, {Dispatch, SetStateAction} from "react";
import Theme from "@/models/Theme";

interface IThemeContext {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = React.createContext<IThemeContext | null>(null);
export default ThemeContext;
