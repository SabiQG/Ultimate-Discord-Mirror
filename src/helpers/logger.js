/**
 * Log a message with an optional timestamp.
 * 
 * @param {string} text - The message to log.
 * @param {boolean} line_break - If true, prepend a newline to the log.
 */
const time_log = (text, line_break = false) => {
    const formattedDate = format_date(new Date());
    const lineBreakString = line_break ? "\n" : "";
    console.log(`${lineBreakString}${formattedDate} : ${text}`);
}

/**
 * Convert a Date object into a readable ISO-like string.
 * 
 * @param {Date} date - The date object to format.
 * @returns {string} - The formatted date string.
 */
const format_date = (date) => {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export default time_log;
