/**
* | output |
* | --- |
* | "Signature Replay" |
*
* @param {Signature_Replay_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_title: ((inputs?: Signature_Replay_TitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_TitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_TitleInputs = {};
