/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Signature_Replay_ResetInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_reset: ((inputs?: Signature_Replay_ResetInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Signature_Replay_ResetInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Signature_Replay_ResetInputs = {};
