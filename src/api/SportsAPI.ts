/**
 * api functions for sports data
 * fetching from thesportsdb.com
 * using test api key: 3
 */
import {IEvents} from "@/models/IEvent";
import typeSafeFetch from "@/helpers/typeSafeFetch";

const API_KEY = "3";
const LEAGUE = "4675";
const CURRENT_SEASON = "2022-2023";

const getEventsOfCurrentSeason = async (): Promise<IEvents> => {
    return await typeSafeFetch<IEvents>(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsseason.php?id=${LEAGUE}&s=${CURRENT_SEASON}`);
}

const getEventsByRound = async (round: number): Promise<IEvents> => {
    return await typeSafeFetch<IEvents>(`https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsround.php?id=${LEAGUE}&r=${round}&s=${CURRENT_SEASON}`);
}

export {
    getEventsByRound,
    getEventsOfCurrentSeason
};




