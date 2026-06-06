/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sky_Cycle_SummaryInputs */

const en_sky_cycle_summary = /** @type {(inputs: Sky_Cycle_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A scroll-driven sky gradient that shifts like the earth rotating through sunset.`)
};

const ko_sky_cycle_summary = /** @type {(inputs: Sky_Cycle_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스크롤에 따라 지구가 자전하듯 일몰 하늘의 그라데이션이 변합니다.`)
};

/**
* | output |
* | --- |
* | "A scroll-driven sky gradient that shifts like the earth rotating through sunset." |
*
* @param {Sky_Cycle_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const sky_cycle_summary = /** @type {((inputs?: Sky_Cycle_SummaryInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sky_Cycle_SummaryInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sky_cycle_summary(inputs)
	return ko_sky_cycle_summary(inputs)
});