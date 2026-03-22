/**
* | output |
* | --- |
* | "A personal website of HyeongJin Lee." |
*
* @param {Meta_Default_DescriptionInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const meta_default_description: ((inputs?: Meta_Default_DescriptionInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Meta_Default_DescriptionInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Meta_Default_DescriptionInputs = {};
