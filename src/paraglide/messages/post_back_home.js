/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Post_Back_HomeInputs */

const en_post_back_home = /** @type {(inputs: Post_Back_HomeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to home`)
};

const ko_post_back_home = /** @type {(inputs: Post_Back_HomeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`홈으로`)
};

/**
* | output |
* | --- |
* | "Back to home" |
*
* @param {Post_Back_HomeInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const post_back_home = /** @type {((inputs?: Post_Back_HomeInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Post_Back_HomeInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_post_back_home(inputs)
	return ko_post_back_home(inputs)
});