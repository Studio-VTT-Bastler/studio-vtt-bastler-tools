/**
 * works similar to console.log(), but adds "SVTTB |" prefix for filtering console
 * @param  {...any} o objects to log
 */
export function log(...o) {
  console.log("SVTTB |", ...o);
}
