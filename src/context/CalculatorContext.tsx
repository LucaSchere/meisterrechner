import {createContext, PropsWithChildren, useState} from "react";
import {ITable} from "@/models/ITable";
import {ChampionshipState} from "@/models/ChampionshipState";

interface ICalculatorContext {
    calculateChampionshipState: (table: ITable) => void;
    championshipState: ChampionshipState;
}

export const CalculatorContext = createContext<ICalculatorContext | null>(null);

const POINTS_PER_WIN = 3;
const MAX_MATCHES = 36;

export const CalculatorProvider = (props: PropsWithChildren) => {

    const [championshipState, setChampionshipState] = useState<ChampionshipState>(ChampionshipState.NotDecided)

    const calculateChampionshipState = (table: ITable) => {
        if (table.standings.length == 0) return;
        const firstTeam = table.standings.reduce((max, standing) => standing.intPoints > max.intPoints ? standing : max);

        const possibleContenders = table.standings.filter(standing => {
            const maxPointsToReach = standing.intPoints + (MAX_MATCHES - standing.intPlayed) * POINTS_PER_WIN;
            return maxPointsToReach > firstTeam.intPoints;
        });
    }

    return (
        <CalculatorContext.Provider value={{calculateChampionshipState, championshipState}}>
            {props.children}
        </CalculatorContext.Provider>
    );
}
