/**
* | output |
* | --- |
* | "Back to home" |
*
* @param {Post_Back_HomeInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const post_back_home: ((inputs?: Post_Back_HomeInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Post_Back_HomeInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Post_Back_HomeInputs = {};
