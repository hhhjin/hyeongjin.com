/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Posts_KickerInputs */

const en_home_posts_kicker = /** @type {(inputs: Home_Posts_KickerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posts`)
};

const ko_home_posts_kicker = /** @type {(inputs: Home_Posts_KickerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`글`)
};

/**
* | output |
* | --- |
* | "Posts" |
*
* @param {Home_Posts_KickerInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const home_posts_kicker = /** @type {((inputs?: Home_Posts_KickerInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Posts_KickerInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_home_posts_kicker(inputs)
	return ko_home_posts_kicker(inputs)
});