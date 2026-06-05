/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Voice_Orb_SummaryInputs */

const en_voice_orb_summary = /** @type {(inputs: Voice_Orb_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A voice-state UI that turns synthetic speech energy into a fluid circular visual.`)
};

const ko_voice_orb_summary = /** @type {(inputs: Voice_Orb_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`말하는 듯한 에너지 변화를 부드러운 원형 비주얼로 보여주는 음성 상태 UI입니다.`)
};

/**
* | output |
* | --- |
* | "A voice-state UI that turns synthetic speech energy into a fluid circular visual." |
*
* @param {Voice_Orb_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const voice_orb_summary = /** @type {((inputs?: Voice_Orb_SummaryInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Voice_Orb_SummaryInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_voice_orb_summary(inputs)
	return ko_voice_orb_summary(inputs)
});