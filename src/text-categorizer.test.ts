import { TextCategorizer } from "./text-categorizer";

// Testing for Links
describe("TextCategorizer", () => {
  it("should categorize text as link", () => {
    const linkResult = TextCategorizer.categorize("https://example.com");
    expect(linkResult.type).toBe("link");
    expect(linkResult.metadata?.links).toEqual(["https://example.com"]);
  });
});

// Testing for Code
describe("TextCategorizer", () => {
  it("should categorize text as code", () => {
    const codeResult = TextCategorizer.categorize("const x = 10");
    expect(codeResult.type).toBe("code");
    expect(codeResult.metadata?.codeLanguage).toBe("javascript");
  });
});

// Testing for equations
describe("TextCategorizer", () => {
  it("should categorize text as equation", () => {
    const equationResult = TextCategorizer.categorize("2 + 2 = 4");
    expect(equationResult.type).toBe("equation");
    expect(equationResult.metadata?.format).toBe("math");
  });
});

// Testing for JSON
describe("TextCategorizer", () => {
  it("should categorize text as json", () => {
    const jsonResult = TextCategorizer.categorize('{"key": "value"}');
    expect(jsonResult.type).toBe("json");
    expect(jsonResult.metadata?.format).toBe("json");
  });
});

// Testing for Email
describe("TextCategorizer", () => {
  it("should categorize text as email", () => {
    const emailResult = TextCategorizer.categorize("test@example.com");
    expect(emailResult.type).toBe("email");
    expect(emailResult.metadata?.emails).toEqual(["test@example.com"]);
  });
});

// Testing for List
describe("TextCategorizer", () => {
  it("should categorize text as list", () => {
    const listResult = TextCategorizer.categorize("- Item 1\n- Item 2");
    expect(listResult.type).toBe("list");
    expect(listResult.metadata?.listItems).toEqual(["Item 1", "Item 2"]);
  });
});

// Testing for Social Post
describe("TextCategorizer", () => {
  it("should categorize text as social post", () => {
    const socialResult = TextCategorizer.categorize("Hello #world @user");
    expect(socialResult.type).toBe("social");
    expect(socialResult.metadata?.hashtags).toEqual(["#world"]);
    expect(socialResult.metadata?.mentions).toEqual(["@user"]);
  });
});

// Testing for Currency
describe("TextCategorizer", () => {
  it("should categorize text as currency", () => {
    const currencyResult = TextCategorizer.categorize("$123.45");
    expect(currencyResult.type).toBe("currency");
    expect(currencyResult.metadata?.amount).toBe(123.45);
    expect(currencyResult.metadata?.currency).toBe("$");
  });
});

// Testing for Product Code
describe("TextCategorizer", () => {
  it("should categorize text as product code", () => {
    const productResult = TextCategorizer.categorize("ABC-123");
    expect(productResult.type).toBe("productCode");
    expect(productResult.metadata?.format).toBe("hyphenated");
  });
});

// Testing for Empty Input
describe("TextCategorizer", () => {
  it("should categorize empty text as text", () => {
    const emptyResult = TextCategorizer.categorize("");
    expect(emptyResult.type).toBe("text");
  });
});

// // Testing for measurements
// describe("TextCategorizer", () => {
//   it("should categorize text as measurement", () => {
//     const measurementResult = TextCategorizer.categorize("10 cm");
//     expect(measurementResult.type).toBe("measurement");
//     // expect(measurementResult.metadata?.unit).toBe("cm");
//   });
// });

// Test for search params
describe("TextCategorizer", () => {
  it("should categorize text as search", () => {
    const searchResult = TextCategorizer.categorize("?q=hello&lang=en");
    expect(searchResult.type).toBe("search");
  });
});
