/**
* | output |
* | --- |
* | "Posts" |
*
* @param {Home_Posts_KickerInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const home_posts_kicker: ((inputs?: Home_Posts_KickerInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Home_Posts_KickerInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Home_Posts_KickerInputs = {};
