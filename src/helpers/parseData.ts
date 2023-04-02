import {ITable} from "@/models/ITable";
import {IEvents} from "@/models/IEvent";

const parseTable = (data: any): ITable => {
    const table = data.table.map((standing: any) => {
        return {
            ...standing,
            intRank: parseInt(standing.intRank),
            intPlayed: parseInt(standing.intPlayed),
            intPoints: parseInt(standing.intPoints)
        };
    });

    return {
        table
    }
};

const parseEvents = (data: any): IEvents => {
    const events = data.events.map((event: any) => {
        return {
            ...event,
        };
    });

    return {
        events
    }
}


export {parseTable, parseEvents};
