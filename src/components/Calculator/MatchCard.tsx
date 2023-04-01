import * as React from 'react';
import Card from "@/components/shared/Card";
import formatMatchDate from "@/helpers/formatMatchDate";

interface IMatchCardProps {
    home: string;
    away: string;
    date: string;
}

const MatchCard = (props: IMatchCardProps): JSX.Element => {

    const formattedDate = formatMatchDate(props.date);

    return <Card>
        <div className={`flex flex-row justify-around pb-2`}>
            <span className={`text-xs badge bg-red-600 text-white`}>{props.home}</span>
            <span className={`text-xs badge bg-green-600 text-white`}>{props.away}</span>
        </div>
        <hr/>
        <div className={`flex justify-center pt-2`}>
            <span className={`text-xs items-center`}>{formattedDate}</span>
        </div>
    </Card>
};

export default MatchCard;
