export interface ITable {
    table: IStanding[]
}

export interface IStanding {
    idStanding: string
    intRank: number
    idTeam: string
    strTeam: string
    strTeamBadge: string
    idLeague: string
    strLeague: string
    strSeason: string
    strForm: string
    strDescription: string
    intPlayed: number
    intWin: string
    intLoss: string
    intDraw: string
    intGoalsFor: string
    intGoalsAgainst: string
    intGoalDifference: string
    intPoints: number
    dateUpdated: string
}
