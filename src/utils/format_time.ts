/**
 *
 * @param {number} ms - milliseconds
 * @returns {string} - hours:minutes day/month
 */
export function format_time(ms: number) {
  const date = new Date(ms);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDay()}/${date.getMonth()}`;
}
