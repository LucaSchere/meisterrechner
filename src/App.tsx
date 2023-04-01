import * as React from 'react';
import Header from "@/components/Header/Header";
import ContentWrapper from "@/components/Calculator/ContentWrapper";
import ThemeContext from "@/context/ThemeContext";
import Theme from "@/models/Theme";
import {useEffect} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Calculator from "@/components/Calculator/Calculator";

const App = () => {

    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    });

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <div className={`App`}>
            {mounted &&
                <ThemeContext.Provider value={{theme, setTheme}}>
                    <Header/>
                    <main className={`pt-16 max-w-screen overflow-hidden`}>
                        <ContentWrapper>
                            <Calculator/>
                        </ContentWrapper>
                    </main>
                </ThemeContext.Provider>
            }
        </div>
    )
}

export default App
