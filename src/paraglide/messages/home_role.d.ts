/**
* | output |
* | --- |
* | "Product Builder" |
*
* @param {Home_RoleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const home_role: ((inputs?: Home_RoleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Home_RoleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Home_RoleInputs = {};
