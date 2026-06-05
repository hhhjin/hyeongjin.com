/**
* | output |
* | --- |
* | "Voice Orb" |
*
* @param {Voice_Orb_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const voice_orb_title: ((inputs?: Voice_Orb_TitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Voice_Orb_TitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Voice_Orb_TitleInputs = {};
