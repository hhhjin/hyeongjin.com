/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Chat_TitleInputs */

const en_chat_title = /** @type {(inputs: Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

const ko_chat_title = /** @type {(inputs: Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Chat_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const chat_title = /** @type {((inputs?: Chat_TitleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_TitleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_chat_title(inputs)
	return ko_chat_title(inputs)
});