/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Post_NextInputs */

const en_post_next = /** @type {(inputs: Post_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next post`)
};

const ko_post_next = /** @type {(inputs: Post_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음 글`)
};

/**
* | output |
* | --- |
* | "Next post" |
*
* @param {Post_NextInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const post_next = /** @type {((inputs?: Post_NextInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Post_NextInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_post_next(inputs)
	return ko_post_next(inputs)
});