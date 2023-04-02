import {IEvent} from "@/models/IEvent";
import _fetch from "@/helpers/_fetch";
import {ITable} from "@/models/ITable";
import {getMockEvents} from "@/mocks/Event";
import getMockTable from "@/mocks/Table";
import {parseEvents, parseTable} from "@/helpers/parseData";


/**
 * api functions for sports data
 * fetching from thesportsdb.com
 * using test api key: 3
 */

const API_KEY = "3";
const LEAGUE = "4675";
const CURRENT_SEASON = "2022-2023";

const USE_MOCKS = true;

const getEventsByRound = async (round: number): Promise<IEvent[]> => {
    return parseEvents(await (
        USE_MOCKS ?
            getMockEvents(round) :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsround.php?id=${LEAGUE}&r=${round}&s=${CURRENT_SEASON}`)));
}

const getTable = async (): Promise<ITable> => {
    return parseTable(await (
        USE_MOCKS ?
            getMockTable() :
            _fetch(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${LEAGUE}&s=${CURRENT_SEASON}`)));
}

export {
    getEventsByRound,
    getTable
};
