import * as React from 'react';
import MatchCard from "@/components/Calculator/MatchCard";
import {IMatchDay} from "@/models/IMatchDay";

interface IMatchDayProps {
    matchDay: IMatchDay
}

const MatchDay = (props: IMatchDayProps): JSX.Element => {
    return <div>
        <h3 className={`text-lg mb-2`}> Matchtag {props.matchDay.round} </h3>
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4`} key={props.matchDay.round}>
            {props.matchDay.events.map((event, index) => {
                return <MatchCard event={event} key={index}/>
            })}
        </div>
    </div>
};

export default MatchDay;

