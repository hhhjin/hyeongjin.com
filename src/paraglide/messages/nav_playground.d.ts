/**
* | output |
* | --- |
* | "Playground" |
*
* @param {Nav_PlaygroundInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const nav_playground: ((inputs?: Nav_PlaygroundInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Nav_PlaygroundInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Nav_PlaygroundInputs = {};
