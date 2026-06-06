/**
* | output |
* | --- |
* | "Sky Cycle" |
*
* @param {Sky_Cycle_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const sky_cycle_title: ((inputs?: Sky_Cycle_TitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sky_Cycle_TitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sky_Cycle_TitleInputs = {};
