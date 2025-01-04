export type ContentCategory = {
  type:
    | "link"
    | "code"
    | "list"
    | "text"
    | "email"
    | "json"
    | "markdown"
    | "equation"
    | "date"
    | "social"
    | "query"
    | "phone"
    | "address"
    | "csv"
    | "xml"
    | "sql"
    | "filepath"
    | "currency"
    | "productCode";
  content: string;
  metadata?: {
    links?: string[];
    listItems?: string[];
    codeLanguage?: string;
    emails?: string[];
    mentions?: string[];
    hashtags?: string[];
    dates?: string[];
    format?: string;
    confidence?: number;
    amount?: number;
    currency?: string;
    countryCode?: string;
    structured?: any;
  };
};
