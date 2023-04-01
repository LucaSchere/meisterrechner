const formatMatchDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const options = {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};
    // @ts-ignore
    const formatter = new Intl.DateTimeFormat('de-DE', options);
    return formatter.format(date).replace('um', '-');
}
export default formatMatchDate;
