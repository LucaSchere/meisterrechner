import { useState, useEffect } from "react";
import {ITable} from "@/models/ITable";
import {IMatchDay} from "@/models/IMatchDay";
import {getEventsByRound, getTable} from "@/api/SportsAPI";

const ROUNDS_PER_CHAMPIONSHIP = 36;

interface IData {
    table: ITable;
    initialTable: ITable;
    nextRound: number;
    setTable: (table: ITable) => void;
    upcomingMatchdays: IMatchDay[];
    setUpcomingMatchdays: (matchDays: IMatchDay[]) => void;
}

export function useData(): IData {
    const [table, setTable] = useState<ITable>({standings: []});
    const [initialTable, setInitialTable] = useState<ITable>({standings: []});
    const [nextRound, setNextRound] = useState<number>(0);
    const [upcomingMatchdays, setUpcomingMatchdays] = useState<IMatchDay[]>([]);
    const fetchData = async () => {
        const table = await getTable();
        const nPlayedMatches: number[] = table.standings.map(team => team.intPlayed);
        const minNPlayedMatches = Math.min(...nPlayedMatches);
        const nextRound = minNPlayedMatches + 1;

        let upcomingMatchdays: IMatchDay[] = [];
        for (let round = nextRound; round <= ROUNDS_PER_CHAMPIONSHIP; round++) {
            const events = await getEventsByRound(round);
            upcomingMatchdays.push({
                round: round,
                events: events
            });
        }
        return { table, nextRound, upcomingMatchdays };
    }

    useEffect(() => {
        fetchData().then(data => {
            setTable(data.table);
            setNextRound(data.nextRound)
            setInitialTable(data.table);
            setUpcomingMatchdays(data.upcomingMatchdays);
        });
    }, []);

    return { table, initialTable, nextRound, setTable, upcomingMatchdays, setUpcomingMatchdays};
}
