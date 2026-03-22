/**
* | output |
* | --- |
* | "View →" |
*
* @param {Playground_ViewInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const playground_view: ((inputs?: Playground_ViewInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Playground_ViewInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Playground_ViewInputs = {};
