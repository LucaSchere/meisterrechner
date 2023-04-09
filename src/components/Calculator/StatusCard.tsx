import * as React from 'react';
import {useContext, useEffect} from 'react';
import Card from "@/components/shared/Card";
import {CalculatorContext} from "@/context/CalculatorContext";
import {ChampionshipState} from "@/models/ChampionshipState";
import {ChampionshipWinType} from "@/models/ChampionshipWinType";
import renameTeam from "@/helpers/renameTeam";
import useMediaQuery from "@/hooks/useMediaQuery";
import useScrollOffset from "@/hooks/useScrollOffset";

const StatusCard = (): JSX.Element => {

    const {winningTeam, championshipState, decidingEvent, championshipWinType} = useContext(CalculatorContext)!!;
    const [offsetReached, listenToScroll, stopListeningToScroll] = useScrollOffset(80); // Header + ContentWrapper padding
    const onSmallDevice = useMediaQuery('(max-width: 560px)');

    const opponent = decidingEvent?.idHomeTeam == winningTeam?.idTeam ? decidingEvent?.strAwayTeam : decidingEvent?.strHomeTeam;

    const determinedMessage =
        `${renameTeam(winningTeam?.strTeam ?? '', true)} wird Meister in Runde ${decidingEvent?.intRound} ` +
        `${championshipWinType == ChampionshipWinType.OnCouch ? 'auf dem Sofa' : `gegen ${renameTeam(opponent ?? '', onSmallDevice)}`} 🏆`;
    const notDecidedMessage = `Meisterschaft noch offen ⚽`;
    const message = championshipState == ChampionshipState.Determined ? determinedMessage : notDecidedMessage;

    useEffect(() => {
        listenToScroll();
        return stopListeningToScroll;
    }, [listenToScroll, stopListeningToScroll]);

    useEffect(() => {

    }, [offsetReached]);

    return <>
        <Card cardStyles={`dark:bg-mine-900 ${offsetReached ? 
            'fixed top-0 left-1/2 translate-x-[-50%] py-4 mx-auto rounded-none growing-status-card md:growing-status-card-md' : 
            'px-2 py-4 md:p-4 sticky top-0'}`
        }>
            <div className={`flex flex-col items-center`}>
                <div className={`text-2xl text-[16px] sm:text-lg md:text-xl font-normal`}>
                    {message}
                </div>
            </div>
        </Card>
    </>
};

export default StatusCard;

