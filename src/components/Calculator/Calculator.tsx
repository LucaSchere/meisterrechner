import * as React from 'react';
import {useEffect} from "react";
import {MOCK_ROUND_EVENTS} from "@/mocks/Event";
import MatchCard from "@/components/Calculator/MatchCard";

const Calculator = (): JSX.Element => {

    const fetchEvents = async () => {
        //const events = await getEventsByRound(25);
        //console.log(events);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return <div className={`flex flex-col gap-12`}>
        {[MOCK_ROUND_EVENTS, MOCK_ROUND_EVENTS, MOCK_ROUND_EVENTS].map((events, round) => {
            return <div>
                <h3 className={`text-xl mb-2`}> Matchtag {round} </h3>
                <div className={`grid grid-cols-2 gap-4`} key={round}>
                    {events.events.map((event, index) => {
                        return <MatchCard home={event.strHomeTeam} away={event.strAwayTeam} date={event.strTimestamp} key={index}/>
                    })}
                </div>
            </div>
        })}
    </div>
};

export default Calculator;

