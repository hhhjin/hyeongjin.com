/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Signature_Replay_SummaryInputs */

const en_signature_replay_summary = /** @type {(inputs: Signature_Replay_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replays user's drawn signature with the exact speed and trajectory.`)
};

const ko_signature_replay_summary = /** @type {(inputs: Signature_Replay_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`유저가 그린 서명을 똑같은 속도와 궤적으로 다시 재생해서 보여줍니다.`)
};

/**
* | output |
* | --- |
* | "Replays user's drawn signature with the exact speed and trajectory." |
*
* @param {Signature_Replay_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const signature_replay_summary = /** @type {((inputs?: Signature_Replay_SummaryInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signature_Replay_SummaryInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_signature_replay_summary(inputs)
	return ko_signature_replay_summary(inputs)
});