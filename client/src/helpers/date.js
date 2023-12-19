export const monthsShort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const formatDate = (date, options) => {
    return new Date(date).toLocaleDateString("en-US", options);
};

export const formatTime = (date, options) => {
    return new Date(date).toLocaleTimeString("en-US", options);
};

export const getTimeDifference = (start) => {
    const now = new Date();
    const before = new Date(start);

    const msDifference = now - before;
    const secDifference = msDifference / 1000;
    const minDifference = secDifference / 60;
    const hrsDifference = msDifference / (1000 * 60 * 60);

    if (secDifference < 60) return `${Math.round(secDifference)}s`;

    if (minDifference < 60) return `${Math.round(minDifference)}m`;

    if (hrsDifference < 24) return `${Math.round(hrsDifference)}h`;

    return `${monthsShort[before.getMonth()]} ${before.getDate()}`;
};
