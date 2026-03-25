/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Post_PreviousInputs */

const en_post_previous = /** @type {(inputs: Post_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous post`)
};

const ko_post_previous = /** @type {(inputs: Post_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이전 글`)
};

/**
* | output |
* | --- |
* | "Previous post" |
*
* @param {Post_PreviousInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const post_previous = /** @type {((inputs?: Post_PreviousInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Post_PreviousInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_post_previous(inputs)
	return ko_post_previous(inputs)
});