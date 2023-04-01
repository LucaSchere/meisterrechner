import * as React from 'react';
import {PropsWithChildren} from "react";

interface ICardProps {
    title?: string;
    text?: string;
    cardStyles?: string;
    titleStyles?: string;
    textStyles?: string;
}

const Card = (props: PropsWithChildren<ICardProps>): JSX.Element => {
    return <div
        className={`block rounded-lg bg-silver-50 p-4 shadow-lg dark:bg-mine-600 ${props.cardStyles}`}>
        {props.title &&
            <h5 className={`mb-2 text-xl font-medium leading-tight text-mine-800 dark:text-silver-100 ${props.titleStyles}`}>
                {props.title}
            </h5>
        }
        {props.text &&
            <p className={`text-base text-neutral-600 dark:text-neutral-200 ${props.textStyles}`}>
                {props.text}
            </p>
        }
        {props.children}
    </div>
};

export default Card;

