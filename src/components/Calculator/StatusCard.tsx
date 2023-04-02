import * as React from 'react';
import {useContext} from 'react';
import Card from "@/components/shared/Card";
import {CalculatorContext} from "@/context/CalculatorContext";
import {ChampionshipState} from "@/models/ChampionshipState";

const StatusCard = (): JSX.Element => {

    const {championshipState} = useContext(CalculatorContext)!!;

    return <Card
        title={championshipState == ChampionshipState.Determined ? "Meister steht fest" : "Meisterschaft noch offen"}
        cardStyles={`p-4`}
    />
};

export default StatusCard;

