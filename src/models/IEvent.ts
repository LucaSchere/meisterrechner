import MatchState from "@/models/MatchState";
import MatchResult from "@/models/MatchResult";

export interface IEvent {
    idEvent: string
    idSoccerXML: string
    idAPIfootball: string
    strEvent: string
    strEventAlternate: string
    strFilename: string
    strSport: string
    idLeague: string
    strLeague: string
    strSeason: string
    strDescriptionEN: string
    strHomeTeam: string
    strAwayTeam: string
    intHomeScore: number
    intRound: number
    intAwayScore: number
    intSpectators: string
    strOfficial: string
    strTimestamp: string
    dateEvent: string
    dateEventLocal: string
    strTime: string
    strTimeLocal: string
    strTVStation: string
    idHomeTeam: string
    idAwayTeam: string
    intScore: string
    intScoreVotes: string
    strResult: string
    strVenue: string
    strCountry: string
    strCity: string
    strPoster: string
    strSquare: string
    strFanart: string
    strThumb: string
    strBanner: string
    strMap: string
    strTweet1: string
    strTweet2: string
    strTweet3: string
    strVideo: string
    strStatus: string
    strPostponed: string
    strLocked: string
    state: MatchState
    result: MatchResult | null
}
