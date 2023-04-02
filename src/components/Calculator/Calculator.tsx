import * as React from 'react';
import {useContext} from "react";
import MatchDay from "@/components/Calculator/MatchDay";
import TableCard from "@/components/Calculator/TableCard";
import {CalculatorContext} from "@/context/CalculatorContext";

const Calculator = (): JSX.Element => {

    const {table, upcomingMatchdays} = useContext(CalculatorContext)!!;

    return <div className={`max-w-sm`}>
        {
            table && upcomingMatchdays && <div>
                <TableCard table={table} showLegacy/>
                <div className={`flex flex-col gap-8 my-8`}>
                    {upcomingMatchdays.map(matchDay => {
                        return <MatchDay matchDay={matchDay} key={matchDay.round}/>
                    })}
                </div>
            </div>
        }
    </div>;
};

export default Calculator;

