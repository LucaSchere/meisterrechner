const formatMatchDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};
    const formatter = new Intl.DateTimeFormat('de-DE', options);
    return formatter.format(date).replace('um', '-');
}
export default formatMatchDate;
