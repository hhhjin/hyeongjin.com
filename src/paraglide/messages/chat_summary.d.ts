/**
* | output |
* | --- |
* | "Explores animation, performance, and interaction ideas in a chat interface." |
*
* @param {Chat_SummaryInputs} inputs
* @param {{ locale?: "en" | "ko" }} options
* @returns {LocalizedString}
*/
export const chat_summary: ((inputs?: Chat_SummaryInputs, options?: {
    locale?: "en" | "ko";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Chat_SummaryInputs, {
    locale?: "en" | "ko";
}, {}>;
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Chat_SummaryInputs = {};
