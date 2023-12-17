const base64ToBytes = (base64: string) =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(9));

const bytesToBase64 = (bytes: Uint8Array) =>
  btoa(String.fromCodePoint(...bytes));

/**
 * @param content Base64 encoded content of a file.
 */
const convertBase64ToUtf = (content: string) =>
  new TextDecoder().decode(base64ToBytes(content));

/**
 * @param content UTF-8 encoded content of a file.
 */
const convertUtfToBase64 = (content: string) =>
  bytesToBase64(new TextEncoder().encode(content));

export { convertBase64ToUtf, convertUtfToBase64 };
