/**
* | output |
* | --- |
* | "A voice-state UI that turns synthetic speech energy into a fluid circular visual." |
*
* @param {Voice_Orb_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const voice_orb_summary: ((inputs?: Voice_Orb_SummaryInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Voice_Orb_SummaryInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Voice_Orb_SummaryInputs = {};
