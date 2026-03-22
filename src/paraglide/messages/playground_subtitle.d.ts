/**
* | output |
* | --- |
* | "Experiments and small builds" |
*
* @param {Playground_SubtitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const playground_subtitle: ((inputs?: Playground_SubtitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Playground_SubtitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Playground_SubtitleInputs = {};
