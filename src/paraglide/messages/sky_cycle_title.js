/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sky_Cycle_TitleInputs */

const en_sky_cycle_title = /** @type {(inputs: Sky_Cycle_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sky Cycle`)
};

const ko_sky_cycle_title = /** @type {(inputs: Sky_Cycle_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sky Cycle`)
};

/**
* | output |
* | --- |
* | "Sky Cycle" |
*
* @param {Sky_Cycle_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const sky_cycle_title = /** @type {((inputs?: Sky_Cycle_TitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sky_Cycle_TitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sky_cycle_title(inputs)
	return ko_sky_cycle_title(inputs)
});