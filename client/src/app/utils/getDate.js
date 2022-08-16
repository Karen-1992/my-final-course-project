export function getDate(date) {
    return date.slice(0, 10).split("-").reverse().join(".");
}
