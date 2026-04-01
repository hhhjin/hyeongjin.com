/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_TitleInputs */

const en_signature_replay_title = /** @type {(inputs: Signature_Replay_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signature Replay`)
};

const ko_signature_replay_title = /** @type {(inputs: Signature_Replay_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signature Replay`)
};

/**
* | output |
* | --- |
* | "Signature Replay" |
*
* @param {Signature_Replay_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_title = /** @type {((inputs?: Signature_Replay_TitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_TitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_title(inputs)
	return ko_signature_replay_title(inputs)
});