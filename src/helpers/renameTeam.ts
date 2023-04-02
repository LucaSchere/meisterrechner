const mapping: { [key: string]: {short: string, long: string }} = {
    'FC Basel': {short: 'FCB', long: 'Basel'},
    'FC Winterthur': {short: 'FCW', long: 'Winterthur'},
    'Servette': {short: 'SFC', long: 'Servette'},
    'St. Gallen': {short: 'FCSG', long: 'St. Gallen'},
    'Lucerne': {short: 'FCL', long: 'Luzern'},
    'FC Sion': {short: 'FCS', long: 'Sion'},
    'Grasshoppers': {short: 'GCZ', long: 'GC'},
    'Zurich': {short: 'FCZ', long: 'FCZ'},
    'Lugano': {short: 'LUG', long: 'Lugano'},
    'Young Boys': {short: 'YB', long: 'Young Boys'},
}

const renameTeam = (teamName: string, short?: boolean) => {
    return (short ? mapping[teamName].short : mapping[teamName].long) || teamName;
}
export default renameTeam;
