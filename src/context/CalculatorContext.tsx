import {createContext, PropsWithChildren, useState} from "react";
import {IStanding, ITable} from "@/models/ITable";
import {ChampionshipState} from "@/models/ChampionshipState";
import {IMatchDay} from "@/models/IMatchDay";
import MatchResult from "@/models/MatchResult";
import {ChampionshipWinType} from "@/models/ChampionshipWinType";
import {IEvent} from "@/models/IEvent";

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

        let bestContenderMaxPossiblePoints = bestContender.intPoints + (MAX_MATCHES - bestContender.intPlayed) * POINTS_PER_WIN

        const championshipState =
            bestContenderMaxPossiblePoints >= firstTeam.intPoints ?
                ChampionshipState.NotDecided : ChampionshipState.Determined;
        setChampionshipState(championshipState);

        /*
         * based on the championship state the deciding round is calculated
         */
        calculateDecidingRound(championshipState, firstTeam, bestContender, upcomingMatchdays, bestContenderMaxPossiblePoints);
    }

    /**
     * Calculates the deciding round based on the championship state and the results of calculateChampionshipState
     * @param championshipState
     * @param firstTeam
     * @param bestContender
     * @param upcomingMatchdays
     * @param bestContenderMaxPossiblePoints
     */
    const calculateDecidingRound = (championshipState: ChampionshipState, firstTeam: IStanding, bestContender: IStanding, upcomingMatchdays: IMatchDay[],  bestContenderMaxPossiblePoints: number) => {
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
         * check if the first team would still be the best ranked contender if they lose the points of the i-th matchday
         * if they would not be the best ranked contender after subtracting the matchday, the i-th matchday is the deciding round
         */
        for (let i = upcomingMatchdays.length - 1; i >= 0; i--) {
            const eventOfFirstTeam = upcomingMatchdays[i].events.find(event => event.idHomeTeam == firstTeam.idTeam || event.idAwayTeam == firstTeam.idTeam)!;
            const eventOfContender = upcomingMatchdays[i].events.find(event => event.idHomeTeam == bestContender.idTeam || event.idAwayTeam == bestContender.idTeam)!;

            const periodFromEventOfFirstTeamToEventOfContender = eventOfContender.date.getTime() - eventOfFirstTeam.date.getTime();

            const pointsOfFirstTeamOnThisMatchDay =
                (eventOfFirstTeam.result == MatchResult.WinHome && eventOfFirstTeam.idHomeTeam == firstTeam.idTeam) ||
                (eventOfFirstTeam.result == MatchResult.WinAway && eventOfFirstTeam.idAwayTeam == firstTeam.idTeam) ? POINTS_PER_WIN :
                    eventOfFirstTeam.result == MatchResult.Draw ? POINTS_PER_DRAW : 0;

            const pointsLostByContenderOnThisMatchDay =
                (eventOfContender.result == MatchResult.WinHome && eventOfContender.idAwayTeam == bestContender.idTeam) ||
                (eventOfContender.result == MatchResult.WinAway && eventOfContender.idHomeTeam == bestContender.idTeam) ? POINTS_PER_WIN :
                    eventOfContender.result == MatchResult.Draw ? POINTS_PER_WIN - POINTS_PER_DRAW : 0;

            const minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI = firstTeamPoints - bestContenderMaxPossiblePoints;

            firstTeamPoints -= pointsOfFirstTeamOnThisMatchDay;
            bestContenderMaxPossiblePoints += pointsLostByContenderOnThisMatchDay;

            if (firstTeamPoints <= bestContenderMaxPossiblePoints) {
                setDecidingRound(upcomingMatchdays[i].round);
                calculateChampionshipWinType(
                    eventOfFirstTeam,
                    eventOfContender,
                    periodFromEventOfFirstTeamToEventOfContender,
                    bestContenderMaxPossiblePoints,
                    firstTeamPoints,
                    pointsLostByContenderOnThisMatchDay,
                    minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI,
                    pointsOfFirstTeamOnThisMatchDay);
                break;
            }
        }
        return bestContenderMaxPossiblePoints;
    }

    /**
     * Calculates the type of the championship win based on the results of calculateDecidingRound
     * @param eventOfFirstTeam
     * @param eventOfContender
     * @param periodFromEventOfFirstTeamToEventOfContender
     * @param bestContenderMaxPossiblePoints
     * @param firstTeamPoints
     * @param pointsLostByContenderOnThisMatchDay
     * @param minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI
     * @param pointsOfFirstTeamOnThisMatchDay
     */
    const calculateChampionshipWinType = (eventOfFirstTeam: IEvent,
                                          eventOfContender: IEvent,
                                          periodFromEventOfFirstTeamToEventOfContender: number,
                                          bestContenderMaxPossiblePoints: number,
                                          firstTeamPoints: number,
                                          pointsLostByContenderOnThisMatchDay: number,
                                          minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI: number,
                                          pointsOfFirstTeamOnThisMatchDay: number) => {

        let decidedByContender = false;

        /*
         * check if the first team plays against the contender in this matchday
         * in this case the championship is never decided by the contender
         */
        if (!(eventOfFirstTeam.idEvent == eventOfContender.idEvent)) {

            /*
             * check if the contender had to play his game before the first team
             * in this case the question if the contender decided the championship is not trivial because in most cases the final team had to
             * play to finally decide the championship
             */
            if (periodFromEventOfFirstTeamToEventOfContender < 0) {

                /*
                 * this value represents the points the first team had to gain in this matchday to finally decide the championship
                 * if the value is 6 it means that the first team had to gain 3 points (win) and the contender had to lose (-3 points in the championship race)
                 */
                const pointsFirstTeamHadToGainInThisMatchDayToWinTheChampionship = bestContenderMaxPossiblePoints - firstTeamPoints;

                /*
                 * if this condition is true the first team had to play is game to decide the championship
                 * so the championship wasn't decided after the contender game
                 */
                const contenderFulfilledHisRequirementsToKeepTheChampionshipGoing =
                    pointsFirstTeamHadToGainInThisMatchDayToWinTheChampionship - pointsLostByContenderOnThisMatchDay >= 0;

                /*
                 * as addition to the condition in the else block the pointsOfFirstTeamOnThisMatchDay must be subtracted because
                 * the first team has not yet played this matchday
                 */
                const contenderHadTheChanceToKeepTheChampionshipGoing =
                    pointsLostByContenderOnThisMatchDay >= minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI - pointsOfFirstTeamOnThisMatchDay;

                /*
                 * the championship was decided by the contender if the contender had the chance to keep the championship going
                 * and didn't fulfill his requirements to keep the championship going
                 */
                decidedByContender =
                    !contenderFulfilledHisRequirementsToKeepTheChampionshipGoing &&
                    contenderHadTheChanceToKeepTheChampionshipGoing

            } else {
                /*
                 * checks if the contender had the chance to keep the championship going
                 * this condition is trivial because the result of the first team game is already known
                 */
                decidedByContender = pointsLostByContenderOnThisMatchDay >= minimalLeadOfFirstTeamInTheEndOfTheSeasonAsAfterMatchDayI;
            }
        }
        setChampionshipWinType(decidedByContender ? ChampionshipWinType.OnCouch : ChampionshipWinType.OnField);
    }

    return (
        <CalculatorContext.Provider
            value={{calculateChampionshipState, championshipState, decidingRound, championshipWinType}}>
            {props.children}
        </CalculatorContext.Provider>
    );
}
