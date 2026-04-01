/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_PlayingInputs */

const en_signature_replay_playing = /** @type {(inputs: Signature_Replay_PlayingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replaying...`)
};

const ko_signature_replay_playing = /** @type {(inputs: Signature_Replay_PlayingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`재생 중...`)
};

/**
* | output |
* | --- |
* | "Replaying..." |
*
* @param {Signature_Replay_PlayingInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_playing = /** @type {((inputs?: Signature_Replay_PlayingInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_PlayingInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_playing(inputs)
	return ko_signature_replay_playing(inputs)
});