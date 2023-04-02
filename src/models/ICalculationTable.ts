export interface ICalculationTable {
    standings: ICalculationTableEntry[]
}

export interface ICalculationTableEntry {
    idTeam: string
    intPlayed: number
    intPoints: number
}
