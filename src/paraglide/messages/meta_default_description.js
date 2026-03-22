/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Meta_Default_DescriptionInputs */

const en_meta_default_description = /** @type {(inputs: Meta_Default_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A personal website of HyeongJin Lee.`)
};

const ko_meta_default_description = /** @type {(inputs: Meta_Default_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이형진의 개인 웹사이트입니다.`)
};

/**
* | output |
* | --- |
* | "A personal website of HyeongJin Lee." |
*
* @param {Meta_Default_DescriptionInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const meta_default_description = /** @type {((inputs?: Meta_Default_DescriptionInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Meta_Default_DescriptionInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_meta_default_description(inputs)
	return ko_meta_default_description(inputs)
});