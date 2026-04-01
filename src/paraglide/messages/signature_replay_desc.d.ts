/**
* | output |
* | --- |
* | "Draw a signature using mouse or touch, and press the 'Replay' button." |
*
* @param {Signature_Replay_DescInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_desc: ((inputs?: Signature_Replay_DescInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_DescInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_DescInputs = {};
