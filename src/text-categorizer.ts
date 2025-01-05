import { PATTERNS } from "./constants";
import type { ContentCategory } from "./types";

export class TextCategorizer {
  private static isLink(text: string): boolean {
    return (
      PATTERNS.URL.test(text.trim()) && text.trim().split("\n").length === 1
    );
  }

  private static containsLinks(text: string): string[] {
    return text.match(PATTERNS.URL) || [];
  }

  private static isList(text: string): boolean {
    const lines = text.split("\n");
    let listItemCount = 0;

    for (const line of lines) {
      if (PATTERNS.LIST_MARKERS.test(line)) {
        listItemCount++;
      }
    }

    return listItemCount >= 2;
  }

  private static getListItems(text: string): string[] {
    return text
      .split("\n")
      .filter((line) => PATTERNS.LIST_MARKERS.test(line))
      .map((line) => line.replace(PATTERNS.LIST_MARKERS, "").trim());
  }

  private static isCode(text: string): boolean {
    const codeKeywords =
      /\b(function|const|let|var|if|else|for|while|return|import|export|class)\b/;
    const codePatterns = /[{};()=><]+/;
    const indentationPattern = /^( {2,}|\t+)/m;
    const commentPattern = /\/\/|\/\*|\*\/|#\s|--\s/;

    const patterns = [
      codeKeywords,
      codePatterns,
      indentationPattern,
      commentPattern
    ];
    const matchCount = patterns.filter((pattern) => pattern.test(text)).length;

    return matchCount >= 2;
  }

  private static detectCodeLanguage(text: string): string | undefined {
    const languageIndicators = {
      typescript: /typescript|interface\s+\w+|:\s*(string|number|boolean)\b/i,
      javascript: /const\s+\w+\s*=|let\s+\w+\s*=|function\s+\w+\s*\(|=>/,
      python: /def\s+\w+\s*\(|import\s+\w+|from\s+\w+\s+import|:\s*$/m,
      html: /<\/?[a-z][\s\S]*>/i,
      css: /{[\s\S]*}\s*$/
    };

    for (const [language, pattern] of Object.entries(languageIndicators)) {
      if (pattern.test(text)) {
        return language;
      }
    }

    return undefined;
  }

  private static isJson(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }

  private static isMarkdown(text: string): boolean {
    const markdownPatterns = [
      /^#\s+.+$/m, // Headers
      /\*\*.+\*\*/, // Bold
      /_.+_/, // Italic
      /\[.+\]\(.+\)/, // Links
      /```[\s\S]*```/, // Code blocks
      /^\s*>\s.+$/m, // Blockquotes
      /!\[.+\]\(.+\)/ // Images
    ];

    return markdownPatterns.some((pattern) => pattern.test(text));
  }

  private static isEmail(text: string): boolean {
    return (
      PATTERNS.EMAIL.test(text.trim()) && text.trim().split("\n").length === 1
    );
  }

  private static isEquation(text: string): boolean {
    return PATTERNS.EQUATION.test(text) && /[+\-*/()=]/.test(text);
  }

  private static isSocialPost(text: string): boolean {
    return PATTERNS.HASHTAG.test(text) || PATTERNS.MENTION.test(text);
  }

  private static extractSocialElements(text: string) {
    return {
      hashtags: text.match(PATTERNS.HASHTAG) || [],
      mentions: text.match(PATTERNS.MENTION) || []
    };
  }

  private static isSearchQuery(text: string): boolean {
    const searchPatterns = [
      /^(what|how|who|where|when|why)\s.+\??$/i,
      /^["'].+["']\s*(site:|filetype:|OR|AND)/i,
      /^[^.!?]+\??$/
    ];

    return searchPatterns.some((pattern) => pattern.test(text.trim()));
  }

  private static extractDates(text: string): string[] {
    return (text.match(PATTERNS.DATE) || []).map((date) => date.trim());
  }

  private static isPhoneNumber(text: string): boolean {
    return PATTERNS.PHONE.test(text.trim());
  }

  private static isAddress(text: string): boolean {
    return PATTERNS.ADDRESS.test(text.trim());
  }

  private static isCsv(text: string): boolean {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return false;

    const hasComma = lines.every((line) => line.includes(","));
    const hasSemicolon = lines.every((line) => line.includes(";"));

    if (!hasComma && !hasSemicolon) return false;

    const hasLineBreaks = lines.some(
      (line) => line.includes("\n") || line.includes("\r")
    );

    if (!hasLineBreaks) return false;

    const commaCount = lines[0].split(",").length;
    return lines.every((line) => line.split(",").length === commaCount);
  }

  private static isXml(text: string): boolean {
    const xmlRegex = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
    return (
      xmlRegex.test(text) &&
      (text.trim().startsWith("<?xml") || text.trim().startsWith("<"))
    );
  }

  private static isSql(text: string): boolean {
    const sqlKeywords =
      /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN|GROUP BY|ORDER BY|HAVING|CREATE|ALTER|DROP|TABLE|INDEX)\b/i;
    return sqlKeywords.test(text) && text.includes(";");
  }

  private static isFilePath(text: string): boolean {
    return PATTERNS.FILE_PATH.test(text.trim());
  }

  private static isCurrency(text: string): boolean {
    return PATTERNS.CURRENCY.test(text.trim());
  }

  private static isProductCode(text: string): boolean {
    return PATTERNS.PRODUCT_CODE.test(text.trim());
  }

  private static parseCurrency(text: string): {
    amount: number;
    currency: string;
  } {
    const match = text.match(PATTERNS.CURRENCY);
    if (!match) return { amount: 0, currency: "unknown" };

    const currencyStr = match[0];
    const amount = parseFloat(currencyStr.replace(/[^\d.-]/g, ""));
    const currency =
      currencyStr.match(/[\$\€\£\¥]|USD|EUR|GBP|JPY/)?.[0] || "unknown";

    return { amount, currency };
  }

  private static parseCsv(text: string): any[] {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {} as any);
    });
  }

  public static categorize(content: string): ContentCategory {
    if (!content.trim()) {
      return { type: "text", content: content };
    }

    // Ordered checks from most structured to least structured
    if (this.isJson(content)) {
      return { type: "json", content, metadata: { format: "json" } };
    }

    if (this.isXml(content)) {
      return { type: "xml", content, metadata: { format: "xml" } };
    }

    if (this.isCsv(content)) {
      return {
        type: "csv",
        content,
        metadata: { structured: this.parseCsv(content), format: "csv" }
      };
    }

    if (this.isEmail(content)) {
      return {
        type: "email",
        content,
        metadata: { emails: [content.trim()] }
      };
    }

    if (this.isPhoneNumber(content)) {
      return {
        type: "phone",
        content,
        metadata: { confidence: 0.9 }
      };
    }

    if (this.isAddress(content)) {
      return {
        type: "address",
        content,
        metadata: { confidence: 0.85 }
      };
    }

    if (this.isSql(content)) {
      return {
        type: "sql",
        content,
        metadata: { format: "sql" }
      };
    }

    if (this.isFilePath(content)) {
      return {
        type: "filepath",
        content,
        metadata: { format: content.includes("\\") ? "windows" : "unix" }
      };
    }

    if (this.isCurrency(content)) {
      return {
        type: "currency",
        content,
        metadata: { ...this.parseCurrency(content) }
      };
    }

    if (this.isProductCode(content)) {
      return {
        type: "productCode",
        content,
        metadata: {
          format: content.includes("-") ? "hyphenated" : "continuous"
        }
      };
    }

    if (this.isMarkdown(content)) {
      return {
        type: "markdown",
        content,
        metadata: { links: this.containsLinks(content), format: "markdown" }
      };
    }

    if (this.isSocialPost(content)) {
      return {
        type: "social",
        content,
        metadata: {
          ...this.extractSocialElements(content),
          links: this.containsLinks(content)
        }
      };
    }

    if (this.isSearchQuery(content)) {
      return {
        type: "query",
        content,
        metadata: { confidence: 0.8 }
      };
    }

    const dates = this.extractDates(content);
    if (dates.length > 0) {
      return {
        type: "date",
        content,
        metadata: { dates }
      };
    }

    if (this.isLink(content)) {
      return {
        type: "link",
        content,
        metadata: { links: [content.trim()] }
      };
    }

    if (this.isCode(content)) {
      return {
        type: "code",
        content,
        metadata: { codeLanguage: this.detectCodeLanguage(content) }
      };
    }

    if (this.isList(content)) {
      return {
        type: "list",
        content,
        metadata: {
          listItems: this.getListItems(content),
          links: this.containsLinks(content)
        }
      };
    }

    return { type: "text", content };
  }
}

export const categorize = (content: string) =>
  TextCategorizer.categorize(content);
