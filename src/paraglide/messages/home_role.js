/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_RoleInputs */

const en_home_role = /** @type {(inputs: Home_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Software Engineer`)
};

const ko_home_role = /** @type {(inputs: Home_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`소프트웨어 엔지니어`)
};

/**
* | output |
* | --- |
* | "Software Engineer" |
*
* @param {Home_RoleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const home_role = /** @type {((inputs?: Home_RoleInputs, options?: { locale?: "en" | "ko" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_RoleInputs, { locale?: "en" | "ko" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_home_role(inputs)
	return ko_home_role(inputs)
});