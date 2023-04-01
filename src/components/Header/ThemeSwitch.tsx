import * as React from 'react';
import {BsFillMoonFill, BsSunFill} from 'react-icons/bs';
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";

const ThemeSwitch = (): JSX.Element => {

    const {theme, setTheme} = useContext(ThemeContext)!!;

    const handleThemeSwitch = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return <>
        <div className="flex justify-center space-x-2">
            <div>
                <button type="button"
                        className="flex items-center rounded-full bg-primary p-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        onClick={handleThemeSwitch}>
                    <BsFillMoonFill className="dark:hidden text-gold-400 text-xl"/>
                    <BsSunFill className="hidden dark:flex text-gold-400 text-xl"/>
                </button>
            </div>
        </div>
    </>
};

export default ThemeSwitch;

