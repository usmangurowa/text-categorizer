export const PATTERNS = {
  URL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
  LIST_MARKERS: /^(\s*[-*•+]|\d+\.)\s/m,
  EMAIL: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
  HASHTAG: /#[a-zA-Z0-9_]+/g,
  MENTION: /@[a-zA-Z0-9_]+/g,
  DATE: /\b(\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}|\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,4})\b/gi,
  EQUATION: /[\d\s]*[+\-*/()=]+[\d\s]*/,
  PHONE: /(?:\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ADDRESS:
    /\d+\s+([A-Za-z]+(\.?\s|\.)){1,}\s*,?\s*([A-Za-z]+\s*,\s*)?[A-Z]{2}\s*\d{5}(-\d{4})?/g,
  CURRENCY: /(?:[\$\€\£\¥]|USD|EUR|GBP|JPY)\s*\d+(:?\,\d{3})*(\.\d{2})?/g,
  PRODUCT_CODE: /^[A-Z0-9]{3,}-[A-Z0-9]{3,}$|^[A-Z]{2,4}\d{4,}$/,
  FILE_PATH:
    /^(?:[a-zA-Z]:\\|\/|\.\/|\.\.\/)(?:[^\\\/:*?"<>|\r\n]+\\)*[^\\\/:*?"<>|\r\n]*$/
};
