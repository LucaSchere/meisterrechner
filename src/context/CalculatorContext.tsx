import {IStanding, ITable} from "@/models/ITable";
import {IMatchDay} from "@/models/IMatchDay";
import {createContext, PropsWithChildren, useEffect} from "react";
import {useData} from "@/hooks/useAPIData";
import MatchResult from "@/models/MatchResult";
import {ICalculationTable} from "@/models/ICalculationTable";
import {ICalculationEvent} from "@/models/ICalculationEvent";
import MatchState from "@/models/MatchState";

interface IContext {
    table: ITable;
    upcomingMatchdays: IMatchDay[];
    updateEventResult: (eventId: string, result: MatchResult) => void;
}

export const CalculatorContext = createContext<IContext | null>(null);

export const CalculatorProvider = (props: PropsWithChildren) => {

    const {
        table,
        initialTable,
        nextRound,
        setTable,
        upcomingMatchdays,
        setUpcomingMatchdays
    } = useData();

    let calculationEvents = upcomingMatchdays.map(matchDay => {
        return matchDay.events.map(event => {

            /*
             * If the event is finished and the table has already been updated with the result
             * this happens because the table delivered by the API is not always up to date
             * if the table is more current than the event this won't work
             */
            if (event.state == MatchState.Finished && event.intRound == nextRound &&
                table.standings.find(standing => standing.idTeam == event.idHomeTeam && standing.intPlayed == nextRound)) {
                return null;
            }

            return {
                idEvent: event.idEvent,
                idHomeTeam: event.idHomeTeam,
                idAwayTeam: event.idAwayTeam,
                intPointsHome: event.result == MatchResult.WinHome ? 3 : event.result == MatchResult.Draw ? 1 : 0,
                intPointsAway: event.result == MatchResult.WinAway ? 3 : event.result == MatchResult.Draw ? 1 : 0,
            } as ICalculationEvent;
        })
    }).flat().filter(event => event != null) as ICalculationEvent[];

    /**
     * Updates the calculation events with the new result and recalculates the table
     * passed to the context to be used by outer components
     * @param eventId
     * @param result
     */
    const updateEventResult = (eventId: string, result: MatchResult) => {
        const updatedMatchDays = upcomingMatchdays.map(matchDay => {
            const updatedEvents = matchDay.events = matchDay.events.map(event => {
                return {
                    ...event,
                    result: event.idEvent == eventId ? result : event.result
                }
            });

            return {
                ...matchDay,
                events: updatedEvents
            }
        });

        setUpcomingMatchdays(updatedMatchDays);
        updateCalculationEvents(eventId, result);
        recalculateTable(createCalculationTable(calculationEvents));
    }

    /**
     * Updates the calculation events with the new result
     * This is needed to keep the calculation events up to date after every result change
     * @param eventId
     * @param result
     */
    const updateCalculationEvents = (eventId: string, result: MatchResult) => {
        calculationEvents = calculationEvents.map(event => {
            return {
                ...event,
                intPointsHome: event.idEvent == eventId ? (result == MatchResult.WinHome ? 3 : result == MatchResult.Draw ? 1 : 0) : event.intPointsHome,
                intPointsAway: event.idEvent == eventId ? (result == MatchResult.WinAway ? 3 : result == MatchResult.Draw ? 1 : 0) : event.intPointsAway,
            }
        });

        console.log(calculationEvents);
    }

    /**
     * Creates a calculation table based on the given calculation events
     * The calculation table can be imagines as a additional layer on top of the initial table
     * The calculation tables is of type ICalculationTable
     * @param calculationEvents
     */
    const createCalculationTable = (calculationEvents: ICalculationEvent[]): ICalculationTable => {
        const calculationTable: ICalculationTable = {
            standings: []
        };

        calculationEvents.forEach(event => {
            const homeTeam = calculationTable.standings.find(team => team.idTeam == event.idHomeTeam);
            const awayTeam = calculationTable.standings.find(team => team.idTeam == event.idAwayTeam);

            const numberOfPlayedMatches = (event.intPointsHome == 0 && event.intPointsAway == 0) ? 0 : 1;

            if (homeTeam) {
                homeTeam.intPoints += event.intPointsHome;
                homeTeam.intPlayed += numberOfPlayedMatches;
            } else {
                calculationTable.standings.push({
                    idTeam: event.idHomeTeam,
                    intPoints: event.intPointsHome,
                    intPlayed: numberOfPlayedMatches
                })
            }

            if (awayTeam) {
                awayTeam.intPoints += event.intPointsAway;
                awayTeam.intPlayed += numberOfPlayedMatches;
            } else {
                calculationTable.standings.push({
                    idTeam: event.idAwayTeam,
                    intPoints: event.intPointsAway,
                    intPlayed: numberOfPlayedMatches
                })
            }
        });

        return calculationTable;
    }

    /**
     * Recalculates the table based on the given calculation table
     * Applies the calculation table to the initial table and sorts the standings
     * @param calculationTable
     */
    const recalculateTable = (calculationTable: ICalculationTable) => {
        const updatedStandings = initialTable.standings.map(standing => {
            return {
                ...standing,
                intPoints: standing.intPoints + (calculationTable.standings.find(calcStanding => calcStanding.idTeam == standing.idTeam)?.intPoints || 0),
                intPlayed: standing.intPlayed + (calculationTable.standings.find(calcStanding => calcStanding.idTeam == standing.idTeam)?.intPlayed || 0)
            } as IStanding;
        });

        const sortedStandings = updatedStandings.sort((a, b) => {
            return b.intPoints - a.intPoints;
        });

        const updatedRankStandings = sortedStandings.map((standing, index) => {
            return {...standing, intRank: index + 1} as IStanding;
        });

        setTable({
            standings: updatedRankStandings
        });
    }

    useEffect(() => {
        recalculateTable(createCalculationTable(calculationEvents));
    }, [initialTable]);

    return (
        <CalculatorContext.Provider value={{table, upcomingMatchdays, updateEventResult}}>
            {props.children}
        </CalculatorContext.Provider>
    );
}
