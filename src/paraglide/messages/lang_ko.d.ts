/**
* | output |
* | --- |
* | "Korean" |
*
* @param {Lang_KoInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const lang_ko: ((inputs?: Lang_KoInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Lang_KoInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Lang_KoInputs = {};
