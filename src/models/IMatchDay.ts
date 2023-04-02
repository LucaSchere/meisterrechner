import {IEvent} from "@/models/IEvent";

export interface IMatchDay {
    round: number;
    events: IEvent[];
}
