/**
* | output |
* | --- |
* | "A scroll-driven sky gradient that shifts like the earth rotating through sunset." |
*
* @param {Sky_Cycle_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const sky_cycle_summary: ((inputs?: Sky_Cycle_SummaryInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sky_Cycle_SummaryInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sky_Cycle_SummaryInputs = {};
