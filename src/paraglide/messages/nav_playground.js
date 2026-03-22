/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_PlaygroundInputs */

const en_nav_playground = /** @type {(inputs: Nav_PlaygroundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Playground`)
};

const ko_nav_playground = /** @type {(inputs: Nav_PlaygroundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`플레이그라운드`)
};

/**
* | output |
* | --- |
* | "Playground" |
*
* @param {Nav_PlaygroundInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const nav_playground = /** @type {((inputs?: Nav_PlaygroundInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_PlaygroundInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_nav_playground(inputs)
	return ko_nav_playground(inputs)
});