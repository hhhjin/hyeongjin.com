/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Playground_ViewInputs */

const en_playground_view = /** @type {(inputs: Playground_ViewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View →`)
};

const ko_playground_view = /** @type {(inputs: Playground_ViewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`보기 →`)
};

/**
* | output |
* | --- |
* | "View →" |
*
* @param {Playground_ViewInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const playground_view = /** @type {((inputs?: Playground_ViewInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Playground_ViewInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_playground_view(inputs)
	return ko_playground_view(inputs)
});