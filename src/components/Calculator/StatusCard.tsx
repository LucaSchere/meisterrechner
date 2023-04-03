import * as React from 'react';
import {useContext} from 'react';
import Card from "@/components/shared/Card";
import {CalculatorContext} from "@/context/CalculatorContext";
import {ChampionshipState} from "@/models/ChampionshipState";
import {ChampionshipWinType} from "@/models/ChampionshipWinType";

const StatusCard = (): JSX.Element => {

    const {championshipState, decidingRound, championshipWinType} = useContext(CalculatorContext)!!;

    return <Card
        title={championshipState == ChampionshipState.Determined ?
            `Meister steht fest in Runde ${decidingRound} (${championshipWinType == ChampionshipWinType.OnField ? 'Feld' : 'Sofa'})` : "Meisterschaft noch offen"}
        cardStyles={`p-4`}
    />
};

export default StatusCard;

