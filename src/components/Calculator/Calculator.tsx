import * as React from 'react';
import {useEffect} from "react";
import MatchDay from "@/components/Calculator/MatchDay";
import TableCard from "@/components/Calculator/TableCard";
import {getEventsByRound, getTable} from "@/api/SportsAPI";
import {ITable} from "@/models/ITable";
import {IMatchDay} from "@/models/IMatchDay";

const Calculator = (): JSX.Element => {

    const [table, setTable] = React.useState<ITable>();
    const [upcomingMatchdays, setUpcomingMatchdays] = React.useState<IMatchDay[]>([]);
    let nextRound = 0;

    const fetchData = async () => {
        const table = await getTable();
        const nPlayedMatches: number[] = table.table.map(team => team.intPlayed);
        const minNPlayedMatches = Math.min(...nPlayedMatches);
        nextRound = minNPlayedMatches + 1;
        setTable(table);

        let fetchedMatchDays: IMatchDay[] = [];
        for (let i = 0; i < 3; i++) {
            const events = await getEventsByRound(nextRound + i);
            fetchedMatchDays.push({
                round: nextRound + i,
                events: events
            });
        }
        setUpcomingMatchdays(fetchedMatchDays);

        return {table, upcomingMatchdays};
    }

    useEffect(() => {
        fetchData().then(_ => console.log('fetched data'));
    }, []);


    return <>
        {
            table && <div>
                <TableCard table={table} showLegacy/>
                <div className={`flex flex-col gap-8 my-8`}>
                    {upcomingMatchdays.map(matchDay => {
                        return <MatchDay round={matchDay.round} events={matchDay.events} key={matchDay.round}/>
                    })}
                </div>
            </div>
        }
    </>;
};

export default Calculator;

