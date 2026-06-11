function calculateDaysBetweenDates(begin, end) {
    const start = new Date(begin);
    const finish = new Date(end);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInMilliseconds = finish - start;
    return Math.round(diffInMilliseconds / millisecondsPerDay);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateDaysBetweenDates,
    };
}
