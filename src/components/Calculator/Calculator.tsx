import * as React from 'react';
import {useContext, useEffect} from "react";
import TableCard from "@/components/Calculator/TableCard";
import {FlashTableContext} from "@/context/FlashTableContext";
import StatusCard from "@/components/Calculator/StatusCard";
import {CalculatorContext} from "@/context/CalculatorContext";
import Bracket from "@/components/Calculator/Bracket";

const Calculator = (): JSX.Element => {

    const {table, upcomingMatchdays} = useContext(FlashTableContext)!;
    const {calculateChampionshipState} = useContext(CalculatorContext)!!;

    useEffect(() => {
        calculateChampionshipState(table, upcomingMatchdays);
    }, [table, upcomingMatchdays]);

    return <div className={`relative`}>
        {
            table && upcomingMatchdays && <>
                <div className={`h-16`}>
                    <StatusCard/>
                </div>
                <div className={`mt-4`}>
                    <TableCard table={table} showLegacy/>
                    <Bracket upcomingMatchdays={upcomingMatchdays}/>
                </div>
            </>
        }
    </div>;
};

export default Calculator;

