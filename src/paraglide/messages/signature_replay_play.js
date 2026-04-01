/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_PlayInputs */

const en_signature_replay_play = /** @type {(inputs: Signature_Replay_PlayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replay`)
};

const ko_signature_replay_play = /** @type {(inputs: Signature_Replay_PlayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`재생`)
};

/**
* | output |
* | --- |
* | "Replay" |
*
* @param {Signature_Replay_PlayInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_play = /** @type {((inputs?: Signature_Replay_PlayInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_PlayInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_play(inputs)
	return ko_signature_replay_play(inputs)
});