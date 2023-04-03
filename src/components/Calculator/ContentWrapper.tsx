'use client'

import * as React from 'react';
import {PropsWithChildren} from "react";

const ContentWrapper = (props: PropsWithChildren): JSX.Element => {
    return <div className={`content-width flex flex-row justify-center p-4`}>
        {props.children}
    </div>
};

export default ContentWrapper;

