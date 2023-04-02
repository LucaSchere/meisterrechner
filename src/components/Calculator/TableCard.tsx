import * as React from 'react';
import Card from "@/components/shared/Card";
import {ITable} from "@/models/ITable";
import TableEntry from "@/components/Calculator/TableEntry";
import {ISpecialStanding} from "@/models/ISpecialStanding";

/**
 * defines which standings should have a special border and color
 * has to be redundant because tailwind doesn't support dynamic classes
 */
const specialStandings: ISpecialStanding[] = [
    {
        rank: 1,
        border: 'border-gold-400',
        background: 'bg-gold-400',
        description: 'Meister'
    },
    {
        rank: 2,
        border: 'border-champions-league-blue',
        background: 'bg-champions-league-blue',
        description: 'CL Quali'
    },
    {
        rank: 4,
        border: 'border-conference-league-green',
        background: 'bg-conference-league-green',
        description: 'UECL Quali'
    },
    {
        rank: 10,
        border: 'border-relegation-red',
        background: 'bg-relegation-red',
        description: 'Barrage'
    },
];

interface ITableCardProps {
    table: ITable;
    showLegacy?: boolean;
}

const TableCard = (props: ITableCardProps): JSX.Element => {

    return <Card title={"Tabelle"} cardStyles={`w-full p-4 my-4`}>
        <div className="flex justify-center">
            <ul className="min-w-min w-full">
                {props.table.standings.map(standing=> {
                    return <TableEntry standing={standing} specialStandings={specialStandings} key={standing.intRank}/>
                })}
            </ul>
        </div>
        {props.showLegacy &&
            <div className={`w-fit pt-4 grid grid-cols-2 gap-y-1 gap-x-4`}>
                {specialStandings.map((standing, index) => {
                    return <div key={index} className={`flex flex-row items-center`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${standing.background} mr-1`}/>
                        <span className={`text-xs`}>{standing.description}</span>
                    </div>
                })}
            </div>
        }
    </Card>
};

export default TableCard;

