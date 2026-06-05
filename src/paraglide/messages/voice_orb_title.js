/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Voice_Orb_TitleInputs */

const en_voice_orb_title = /** @type {(inputs: Voice_Orb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voice Orb`)
};

const ko_voice_orb_title = /** @type {(inputs: Voice_Orb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voice Orb`)
};

/**
* | output |
* | --- |
* | "Voice Orb" |
*
* @param {Voice_Orb_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const voice_orb_title = /** @type {((inputs?: Voice_Orb_TitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Voice_Orb_TitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_voice_orb_title(inputs)
	return ko_voice_orb_title(inputs)
});