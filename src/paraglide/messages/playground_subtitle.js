/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Playground_SubtitleInputs */

const en_playground_subtitle = /** @type {(inputs: Playground_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experiments and small builds`)
};

const ko_playground_subtitle = /** @type {(inputs: Playground_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험과 작은 빌드`)
};

/**
* | output |
* | --- |
* | "Experiments and small builds" |
*
* @param {Playground_SubtitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const playground_subtitle = /** @type {((inputs?: Playground_SubtitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Playground_SubtitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_playground_subtitle(inputs)
	return ko_playground_subtitle(inputs)
});