/**
 * api functions for sports data
 * fetching from thesportsdb.com
 * using test api key: 3
 */
import {IEvents} from "@/models/IEvent";
import _fetch from "@/helpers/_fetch";
import {ITable} from "@/models/ITable";
import {getMockEvents} from "@/mocks/Event";
import getMockTable from "@/mocks/Table";
import {parseEvents, parseTable} from "@/helpers/parseData";

const API_KEY = "3";
const LEAGUE = "4675";
const CURRENT_SEASON = "2022-2023";

const USE_MOCKS = true;

const getNextEventsInLeague = async (): Promise<IEvents> => {
    return parseEvents(await (
        USE_MOCKS ?
            getMockEvents() :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsnext.php?id=${LEAGUE}`)));
}
const getEventsOfCurrentSeason = async (): Promise<IEvents> => {
    return parseEvents(await (
        USE_MOCKS ?
            getMockEvents() :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsseason.php?id=${LEAGUE}&s=${CURRENT_SEASON}`)));
}

const getEventsByRound = async (round: number): Promise<IEvents> => {
    return parseEvents(await (
        USE_MOCKS ?
            getMockEvents() :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsround.php?id=${LEAGUE}&r=${round}&s=${CURRENT_SEASON}`)));
}

const getTable = async (): Promise<ITable> => {
    return parseTable(await (
        USE_MOCKS ?
            getMockTable() :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${LEAGUE}&s=${CURRENT_SEASON}`)));
}

export {
    getNextEventsInLeague,
    getEventsOfCurrentSeason,
    getEventsByRound,
    getTable
};




