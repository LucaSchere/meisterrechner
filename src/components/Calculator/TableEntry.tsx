import * as React from 'react';
import renameTeam from "@/helpers/renameTeam";
import {IStanding} from "@/models/ITable";
import {ISpecialStanding} from "@/models/ISpecialStanding";

interface ITableEntryProps {
    standing: IStanding;
    specialStandings: ISpecialStanding[];
}

const TableEntry = (props: ITableEntryProps): JSX.Element => {

    const specialStanding = props.specialStandings.find(standing => standing.rank == props.standing.intRank);

    const borderClass = specialStanding ? `${specialStanding.border}` : 'border-neutral-100 dark:border-opacity-50';

    return <li
        className={`w-full flex justify-between px-1 py-[0.2rem] border-b-2 ${borderClass}`}>
        <span className={`text-xs`}>
            {`${props.standing.intRank}. ${renameTeam(props.standing.strTeam)}`}
        </span>
        <div className={`flex gap-x-3`}>
            <span className={`text-xs`}>{props.standing.intPlayed}</span>
            <span className={`text-xs font-bold`}>{props.standing.intPoints}</span>
        </div>
    </li>
}

export default TableEntry;

