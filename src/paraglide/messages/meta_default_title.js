/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Meta_Default_TitleInputs */

const en_meta_default_title = /** @type {(inputs: Meta_Default_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HyeongJin Lee`)
};

const ko_meta_default_title = /** @type {(inputs: Meta_Default_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이형진`)
};

/**
* | output |
* | --- |
* | "HyeongJin Lee" |
*
* @param {Meta_Default_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const meta_default_title = /** @type {((inputs?: Meta_Default_TitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Meta_Default_TitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_meta_default_title(inputs)
	return ko_meta_default_title(inputs)
});