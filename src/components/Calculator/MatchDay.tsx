import * as React from 'react';
import {IEvents} from "@/models/IEvent";
import MatchCard from "@/components/Calculator/MatchCard";

interface IMatchDayProps {
    round: number;
    events: IEvents;
}

const MatchDay = (props: IMatchDayProps): JSX.Element => {
    return <div>
        <h3 className={`text-lg mb-2`}> Matchtag {props.round} </h3>
        <div className={`grid grid-cols-2 gap-2`} key={props.round}>
            {props.events.events.map((event, index) => {
                return <MatchCard home={event.strHomeTeam} away={event.strAwayTeam}
                                  date={event.strTimestamp} key={index}/>
            })}
        </div>
    </div>
};

export default MatchDay;

