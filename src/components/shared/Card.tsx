import * as React from 'react';
import {MouseEventHandler, PropsWithChildren} from "react";

interface ICardProps {
    title?: string;
    text?: string;
    cardStyles?: string;
    titleStyles?: string;
    textStyles?: string;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Card = (props: PropsWithChildren<ICardProps>): JSX.Element => {
    return <div
        onClick={props.onClick}
        className={`block rounded-lg bg-silver-50 shadow-lg dark:bg-mine-600 ${props.cardStyles ? props.cardStyles : ''}`}>
        {props.title &&
            <h5 className={`mb-2 text-lg font-medium leading-tight ${props.titleStyles ? props.title : ''}`}>
                {props.title}
            </h5>
        }
        {props.text &&
            <p className={`text-base ${props.textStyles ? props.textStyles : ''}`}>
                {props.text}
            </p>
        }
        {props.children}
    </div>
};

export default Card;

