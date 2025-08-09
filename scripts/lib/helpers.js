/**
 * works similar to console.log(), but adds "SVTTB |" prefix for filtering console
 * @param  {...any} o objects to log
 */
export function log(...o) {
  console.log("SVTTB |", ...o);
}
export const registerBasicHelpers = () => {
    Handlebars.registerHelper('for', function (from, to, options) {
            let accum = '';
            for (let i = from; i < to; i += 1) {
                accum += options.fn(i);
            }
    
            return accum;
    });
    // Register a Handlebars helper called 'capitalizeFirst'
    Handlebars.registerHelper('capitalizeFirst', function (string) {
        if (typeof string !== 'string' || !string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    });
};