import * as React from 'react';
import {useContext, useEffect} from 'react';
import Card from "@/components/shared/Card";
import formatMatchDate from "@/helpers/formatMatchDate";
import renameTeam from "@/helpers/renameTeam";
import MatchState from "@/models/MatchState";
import useMediaQuery from "@/hooks/useMediaQuery";
import {IEvent} from "@/models/IEvent";
import {FlashTableContext} from "@/context/FlashTableContext";
import MatchResult from "@/models/MatchResult";
import {CalculatorContext} from "@/context/CalculatorContext";

interface IMatchCardProps {
    event: IEvent;
}

const MatchCard = (props: IMatchCardProps): JSX.Element => {

    const {decidingEvent} = useContext(CalculatorContext)!;
    const {updateEventResult} = React.useContext(FlashTableContext)!;

    const onUltraSmallDevice = useMediaQuery('(max-width: 360px)');

    const formattedDate = formatMatchDate(props.event.date);
    const home = renameTeam(props.event.strHomeTeam, onUltraSmallDevice);
    const away = renameTeam(props.event.strAwayTeam, onUltraSmallDevice);

    const [awayClass, setAwayClass] = React.useState<string>('');
    const [homeClass, setHomeClass] = React.useState<string>('');
    const [isDecidingMatch, setIsDecidingMatch] = React.useState<boolean>(false);

    useEffect(() => {
        setIsDecidingMatch(
            props.event.idEvent == decidingEvent?.idEvent
        );
    }, [decidingEvent]);

    useEffect(() => {
        if (props.event.result == MatchResult.WinHome) {
            setHomeClass('text-white bg-green-700');
            setAwayClass('text-white bg-red-700');
        } else if (props.event.result == MatchResult.WinAway) {
            setHomeClass('text-white bg-red-700');
            setAwayClass('text-white bg-green-700');
        } else if (props.event.result == MatchResult.Draw) {
            setHomeClass('text-white bg-gray-700');
            setAwayClass('text-white bg-gray-700');
        } else if (props.event.state == MatchState.NotStarted) {
            setHomeClass('');
            setAwayClass('');
        }
    }, [props.event.result]);

    const handleMatchCardClick = () => {
        updateEventResult(props.event);
    }

    return <div className={`${isDecidingMatch && 'decider-indicator'}`}>
        <Card onClick={handleMatchCardClick}
              cardStyles={'px-2 py-4 hover:cursor-pointer select-none'}>
            <div className={`flex flex-row justify-around pb-2`}>
            <span
                className={`text-xs badge ${homeClass}`}>
                {home}
            </span>
                <span
                    className={`text-xs badge ${awayClass}`}>
                {away}
            </span>
            </div>
            <hr className={'mx-4'}/>
            <div className={`flex justify-center pt-2`}>
                <span className={`text-xs items-center`}>{formattedDate}</span>
            </div>
            <div className={`flex justify-center`}>
            <span className={`text-xs items-center`}>
                {props.event.state == MatchState.Finished && 'beendet'}
                {props.event.state == MatchState.NotStarted && 'noch nicht gestartet'}
                {props.event.state == MatchState.InProgress && 'läuft'}
            </span>
            </div>
        </Card>
    </div>
};

export default MatchCard;
