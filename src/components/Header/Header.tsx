import * as React from 'react';
import ThemeSwitch from "@/components/Header/ThemeSwitch";

const Header = (): JSX.Element => {
    return <header className="top-0 w-full h-16">
        <nav
            className={`relative flex h-full w-full flex-wrap items-center py-3 header`}>
            <div className="flex w-full flex-wrap items-center justify-between px-6">
                <div>
                    <a className="text-xl" href="#">Meisterrechner</a>
                </div>
                <ThemeSwitch/>
            </div>
        </nav>
    </header>
};

export default Header;


