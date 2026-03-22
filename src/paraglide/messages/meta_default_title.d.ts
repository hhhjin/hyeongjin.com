/**
* | output |
* | --- |
* | "HyeongJin Lee" |
*
* @param {Meta_Default_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const meta_default_title: ((inputs?: Meta_Default_TitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Meta_Default_TitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Meta_Default_TitleInputs = {};
