/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Chat_TitleInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const chat_title: ((inputs?: Chat_TitleInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Chat_TitleInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Chat_TitleInputs = {};
