/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_DescInputs */

const en_signature_replay_desc = /** @type {(inputs: Signature_Replay_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Draw a signature using mouse or touch, and press the 'Replay' button.`)
};

const ko_signature_replay_desc = /** @type {(inputs: Signature_Replay_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`마우스나 터치를 이용해 서명을 그리고, '재생' 버튼을 눌러보세요.`)
};

/**
* | output |
* | --- |
* | "Draw a signature using mouse or touch, and press the 'Replay' button." |
*
* @param {Signature_Replay_DescInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_desc = /** @type {((inputs?: Signature_Replay_DescInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_DescInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_desc(inputs)
	return ko_signature_replay_desc(inputs)
});