/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_ResetInputs */

const en_signature_replay_reset = /** @type {(inputs: Signature_Replay_ResetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear`)
};

const ko_signature_replay_reset = /** @type {(inputs: Signature_Replay_ResetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`초기화`)
};

/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Signature_Replay_ResetInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_reset = /** @type {((inputs?: Signature_Replay_ResetInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_ResetInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_reset(inputs)
	return ko_signature_replay_reset(inputs)
});