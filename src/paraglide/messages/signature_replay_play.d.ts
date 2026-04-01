/**
* | output |
* | --- |
* | "Replay" |
*
* @param {Signature_Replay_PlayInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_play: ((inputs?: Signature_Replay_PlayInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_PlayInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_PlayInputs = {};
