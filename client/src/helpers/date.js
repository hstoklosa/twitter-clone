const generateOptions = (start, end) => {
    const options = [];

    for (let i = start; i <= end; i++) {
        options.push(i);
    }

    return options;
};

export const monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const days = generateOptions(1, 31);
export const years = generateOptions(1900, new Date().getFullYear());

export const formatDate = (date, options) => {
    const formDate = new Date(date);
    return formDate.toLocaleDateString("en-US", options);
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
