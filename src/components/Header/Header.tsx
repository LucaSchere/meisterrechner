import * as React from 'react';
import ThemeSwitch from "@/components/Header/ThemeSwitch";

const Header = (): JSX.Element => {
    return <header className="fixed top-0 w-full h-16">
        <nav
            className={`relative flex h-full w-full flex-wrap items-center py-3 justify-between shadow-xl 
            bg-silver-50 dark:bg-mine-900`}>
            <div className="flex w-full flex-wrap items-center justify-between px-6">
                <div>
                    <a className="text-xl text-mine-800 dark:text-silver-100" href="#">Meisterrechner</a>
                </div>
                <ThemeSwitch/>
            </div>
        </nav>
    </header>
};

export default Header;


