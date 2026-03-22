/**
* | output |
* | --- |
* | "English" |
*
* @param {Lang_EnInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const lang_en: ((inputs?: Lang_EnInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Lang_EnInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Lang_EnInputs = {};
