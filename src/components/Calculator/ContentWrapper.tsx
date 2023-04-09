'use client'

import * as React from 'react';
import {PropsWithChildren} from "react";

const ContentWrapper = (props: PropsWithChildren): JSX.Element => {
    return <div className={`absolute w-full flex flex-row justify-center p-4`}>
        <div className={`content-width `}>
            {props.children}
        </div>
    </div>
};

export default ContentWrapper;

