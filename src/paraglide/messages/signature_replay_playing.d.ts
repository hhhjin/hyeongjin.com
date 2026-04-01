/**
* | output |
* | --- |
* | "Replaying..." |
*
* @param {Signature_Replay_PlayingInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_playing: ((inputs?: Signature_Replay_PlayingInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_PlayingInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_PlayingInputs = {};
