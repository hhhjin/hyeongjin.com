/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Chat_SummaryInputs */

const en_chat_summary = /** @type {(inputs: Chat_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explores animation, performance, and interaction ideas in a chat interface.`)
};

const ko_chat_summary = /** @type {(inputs: Chat_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`채팅 인터페이스에서 애니메이션, 성능 개선, 인터랙션 아이디어를 실험합니다.`)
};

/**
* | output |
* | --- |
* | "Explores animation, performance, and interaction ideas in a chat interface." |
*
* @param {Chat_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const chat_summary = /** @type {((inputs?: Chat_SummaryInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_SummaryInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_chat_summary(inputs)
	return ko_chat_summary(inputs)
});