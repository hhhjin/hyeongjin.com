/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Lang_KoInputs */

const en_lang_ko = /** @type {(inputs: Lang_KoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Korean`)
};

const ko_lang_ko = /** @type {(inputs: Lang_KoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`한국어`)
};

/**
* | output |
* | --- |
* | "Korean" |
*
* @param {Lang_KoInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const lang_ko = /** @type {((inputs?: Lang_KoInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_KoInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_lang_ko(inputs)
	return ko_lang_ko(inputs)
});