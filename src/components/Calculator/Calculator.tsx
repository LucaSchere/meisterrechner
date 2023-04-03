import * as React from 'react';
import {useContext, useEffect} from "react";
import MatchDay from "@/components/Calculator/MatchDay";
import TableCard from "@/components/Calculator/TableCard";
import {FlashTableContext} from "@/context/FlashTableContext";
import StatusCard from "@/components/Calculator/StatusCard";
import {CalculatorContext} from "@/context/CalculatorContext";

const Calculator = (): JSX.Element => {

    const {table, upcomingMatchdays} = useContext(FlashTableContext)!!;
    const {calculateChampionshipState} = useContext(CalculatorContext)!!;

    useEffect(() => {
        calculateChampionshipState(table);
    }, [table]);

    return <div className={`w-full max-w-5xl`}>
        {
            table && upcomingMatchdays && <>
                <div className={``}>
                    <StatusCard/>
                    <TableCard table={table} showLegacy/>
                </div>
                <div className={`grid md:grid-cols-2 gap-4 my-4`}>
                    {upcomingMatchdays.map(matchDay => {
                        return <MatchDay matchDay={matchDay} key={matchDay.round}/>
                    })}
                </div>
            </>
        }
    </div>;
};

export default Calculator;

