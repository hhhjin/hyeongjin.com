/**
* | output |
* | --- |
* | "Replays user's drawn signature with the exact speed and trajectory." |
*
* @param {Signature_Replay_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_summary: ((inputs?: Signature_Replay_SummaryInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_SummaryInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_SummaryInputs = {};
