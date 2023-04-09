import * as React from 'react';
import MatchDay from "@/components/Calculator/MatchDay";
import {IMatchDay} from "@/models/IMatchDay";

interface IBracketProps {
    upcomingMatchdays: IMatchDay[];
}

const Bracket = (props: IBracketProps): JSX.Element => {
    return <div className={`grid md:grid-cols-2 gap-4 lg:gap-6 my-4`}>
        {props.upcomingMatchdays.map(matchDay => {
            return <MatchDay matchDay={matchDay} key={matchDay.round}/>
        })}
    </div>
};

export default Bracket;

