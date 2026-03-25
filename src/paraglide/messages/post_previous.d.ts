/**
* | output |
* | --- |
* | "Previous post" |
*
* @param {Post_PreviousInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const post_previous: ((inputs?: Post_PreviousInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Post_PreviousInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Post_PreviousInputs = {};
