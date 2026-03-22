/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Lang_Switch_LabelInputs */

const en_lang_switch_label = /** @type {(inputs: Lang_Switch_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

const ko_lang_switch_label = /** @type {(inputs: Lang_Switch_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`언어`)
};

/**
* | output |
* | --- |
* | "Language" |
*
* @param {Lang_Switch_LabelInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const lang_switch_label = /** @type {((inputs?: Lang_Switch_LabelInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_Switch_LabelInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_lang_switch_label(inputs)
	return ko_lang_switch_label(inputs)
});