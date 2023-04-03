import {createContext, PropsWithChildren, useState} from "react";
import {IStanding, ITable} from "@/models/ITable";
import {ChampionshipState} from "@/models/ChampionshipState";
import {IMatchDay} from "@/models/IMatchDay";
import MatchResult from "@/models/MatchResult";
import {ChampionshipWinType} from "@/models/ChampionshipWinType";

interface ICalculatorContext {
    calculateChampionshipState: (table: ITable, upcomingMatchdays: IMatchDay[]) => void;
    championshipState: ChampionshipState;
    decidingRound: number;
    championshipWinType: ChampionshipWinType;
}

export const CalculatorContext = createContext<ICalculatorContext | null>(null);

const POINTS_PER_WIN = 3;
const POINTS_PER_DRAW = 1;
const MAX_MATCHES = 36;

export const CalculatorProvider = (props: PropsWithChildren) => {

    const [championshipState, setChampionshipState] = useState<ChampionshipState>(ChampionshipState.NotDecided)
    const [decidingRound, setDecidingRound] = useState<number>(-1);
    const [championshipWinType, setChampionshipWinType] = useState<ChampionshipWinType>(ChampionshipWinType.OnField);

    /**
     * Calculates the championship state and the deciding round if the championship is decided yet
     * if the championship is not decided yet the deciding round won't be calculated
     * @param table
     * @param upcomingMatchdays
     */
    const calculateChampionshipState = (table: ITable, upcomingMatchdays: IMatchDay[]) => {
        if (table.standings.length == 0) return;

        /*
         * Calculate championship state based on the current table
         * if the first team has more points than any other team could possibly get in the remaining matchdays
         */
        const firstTeam = table.standings.reduce((max, standing) => standing.intPoints > max.intPoints ? standing : max);
        const bestContender = table.standings
            .filter(standing => standing.idTeam != firstTeam.idTeam)
            .reduce((max, standing) => standing.intPoints > max.intPoints ? standing : max);

        const bestContenderMaxPossiblePoints = bestContender.intPoints + (MAX_MATCHES - bestContender.intPlayed) * POINTS_PER_WIN

        const championshipState =
            bestContenderMaxPossiblePoints >= firstTeam.intPoints ?
                ChampionshipState.NotDecided : ChampionshipState.Determined;
        setChampionshipState(championshipState);

        if (championshipState == ChampionshipState.NotDecided) {
            setDecidingRound(-1);
            return;
        }

        /*
         * If the championship ist not decided yet there is at least one participant that could still overtake the first team
         * the deciding round is the round in which the current first team could possibly still lose the championship
         */
        let firstTeamPoints = firstTeam.intPoints;

        /*
         * Iterate over all upcoming matchdays starting with the last one
         * check if the first team would still be the best ranked contender if they lose the points of this matchday
         * if they would not be the best ranked contender after subtracting the matchday: set the deciding round
         */
        for (let i = upcomingMatchdays.length - 1; i >= 0; i--) {


            /** TODO
             * case of sofameister
             * e.g. lose in matchday 34 of contender & firstTeam not fully played matchdays before
             * in this case the deciding round is 34 but could be earlyer if the firstTeam wins in the matchday before
             */


            const eventOfFirstTeam = upcomingMatchdays[i].events.find(event => event.idHomeTeam == firstTeam.idTeam || event.idAwayTeam == firstTeam.idTeam)!;
            const pointsOfFirstTeamInThisMatchDay =
                (eventOfFirstTeam.result == MatchResult.WinHome && eventOfFirstTeam.idHomeTeam == firstTeam.idTeam) ||
                (eventOfFirstTeam.result == MatchResult.WinAway && eventOfFirstTeam.idAwayTeam == firstTeam.idTeam) ? POINTS_PER_WIN :
                    eventOfFirstTeam.result == MatchResult.Draw ? POINTS_PER_DRAW : 0;
            firstTeamPoints -= pointsOfFirstTeamInThisMatchDay;
            if (firstTeamPoints <= bestContenderMaxPossiblePoints) {
                setDecidingRound(upcomingMatchdays[i].round);
                calculateChampionshipWinType(firstTeam, bestContender, upcomingMatchdays[i]);
                break;
            }
        }
    }

    const calculateChampionshipWinType = (firstStanding: IStanding, contenderStanding: IStanding, matchDay: IMatchDay) => {
        const eventOfFirstTeam = matchDay.events.find(event => event.idHomeTeam == firstStanding.idTeam || event.idAwayTeam == firstStanding.idTeam)!;
        const eventOfContender = matchDay.events.find(event => event.idHomeTeam == contenderStanding.idTeam || event.idAwayTeam == contenderStanding.idTeam)!;

        const firstTeamWins = (eventOfFirstTeam.result == MatchResult.WinHome && eventOfFirstTeam.idHomeTeam == firstStanding.idTeam) ||
            (eventOfFirstTeam.result == MatchResult.WinAway && eventOfFirstTeam.idAwayTeam == firstStanding.idTeam);
        const contenderWins = (eventOfContender.result == MatchResult.WinHome && eventOfContender.idHomeTeam == contenderStanding.idTeam) ||
            (eventOfContender.result == MatchResult.WinAway && eventOfContender.idAwayTeam == contenderStanding.idTeam);

        /** TODO
         * check for sofameister
         */
    }

    return (
        <CalculatorContext.Provider
            value={{calculateChampionshipState, championshipState, decidingRound, championshipWinType}}>
            {props.children}
        </CalculatorContext.Provider>
    );
}
