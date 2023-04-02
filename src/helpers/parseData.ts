import {ITable} from "@/models/ITable";
import {IEvent} from "@/models/IEvent";
import MatchState from "@/models/MatchState";
import MatchResult from "@/models/MatchResult";

/**
 *  Parse the data from the API to the correct type
 *  Mainly used to convert strings to numbers
 */

const parseTable = (data: any): ITable => {
    const standings = data.table.map((standing: any) => {
        return {
            ...standing,
            intRank: parseInt(standing.intRank),
            intPlayed: parseInt(standing.intPlayed),
            intPoints: parseInt(standing.intPoints)
        };
    });

    return {
        standings: standings
    }
};

const parseEvents = (data: any): IEvent[] => {
    return data.events.map((event: any) => {
        let state = MatchState.NotStarted;
        if (event.strStatus === "1H" || event.strStatus === "2H") {
            state = MatchState.InProgress;
        } else if (event.strStatus === "Match Finished") {
            state = MatchState.Finished;
        }

        let result = null;
        if (event.intHomeScore != "null" && event.intAwayScore != "null") {
            if (parseInt(event.intHomeScore) > parseInt(event.intAwayScore)) {
                result = MatchResult.WinHome;
            } else if (parseInt(event.intHomeScore) < parseInt(event.intAwayScore)) {
                result = MatchResult.WinAway;
            } else if (parseInt(event.intHomeScore) === parseInt(event.intAwayScore)) {
                result = MatchResult.Draw;
            }
        }

        return {
            ...event,
            intHomeScore: parseInt(event.intHomeScore),
            intAwayScore: parseInt(event.intAwayScore),
            intRound: parseInt(event.intRound),
            state: state,
            result: result
        };
    });
};


export {parseTable, parseEvents};
