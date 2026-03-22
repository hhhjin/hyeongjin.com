/**
* | output |
* | --- |
* | "Language" |
*
* @param {Lang_Switch_LabelInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const lang_switch_label: ((inputs?: Lang_Switch_LabelInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Lang_Switch_LabelInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Lang_Switch_LabelInputs = {};
