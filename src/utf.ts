/**
 * @param content Base64 encoded content of a file.
 */
const convertBase64ToUtf = (content: string) =>
  Buffer.from(content, "base64").toString("utf-8");

/**
 * @param content UTF-8 encoded content of a file.
 */
const convertUtfToBase64 = (content: string) =>
  Buffer.from(content).toString("base64");

export { convertBase64ToUtf, convertUtfToBase64 };
