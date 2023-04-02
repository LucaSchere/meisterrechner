import * as React from 'react';
import Card from "@/components/shared/Card";
import formatMatchDate from "@/helpers/formatMatchDate";
import renameTeam from "@/helpers/renameTeam";
import MatchState from "@/models/MatchState";
import {useEffect} from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IMatchCardProps {
    home: string;
    away: string;
    date: string;
}

const MatchCard = (props: IMatchCardProps): JSX.Element => {

    const onUltraSmallDevice = useMediaQuery('(max-width: 360px)');

    const formattedDate = formatMatchDate(props.date);
    const home = renameTeam(props.home, onUltraSmallDevice);
    const away = renameTeam(props.away, onUltraSmallDevice);

    const [matchState, setMatchState] = React.useState<MatchState>(MatchState.NotStarted);

    const [awayClass, setAwayClass] = React.useState<string>('bg-gray-800');
    const [homeClass, setHomeClass] = React.useState<string>('bg-gray-800');

    useEffect(() => {
        switch (matchState) {
            case MatchState.NotStarted:
                setHomeClass('');
                setAwayClass('');
                break;
            case MatchState.WinHome:
                setHomeClass('text-white bg-green-700');
                setAwayClass('text-white bg-red-700');
                break;
            case MatchState.WinAway:
                setHomeClass('text-white bg-red-700');
                setAwayClass('text-white bg-green-700');
                break;
            case MatchState.Draw:
                setHomeClass('text-white bg-gray-700');
                setAwayClass('text-white bg-gray-700');
                break;
        }
    }, [matchState]);

    const handleMatchCardClick = () => {
        if (matchState == MatchState.Draw) {
            setMatchState(MatchState.WinHome);
        } else {
            setMatchState(state => state + 1);
        }
    }

    return <Card onClick={handleMatchCardClick} cardStyles={'px-2 py-4 hover:cursor-pointer select-none'}>
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
    </Card>
};

export default MatchCard;
