// Install the package
npm install content-type-classifier

// Basic Usage
import { ContentTypeClassifier } from 'content-type-classifier';

// Classify any text content
const result = ContentTypeClassifier.categorize("your text here");

import { ContentTypeClassifier } from 'content-type-classifier';

// 1. Detecting Links
const linkResult = ContentTypeClassifier.categorize("https://www.example.com");
console.log(linkResult);
// Output: {
// type: "link",
// content: "https://www.example.com",
// metadata: { links: ["https://www.example.com"] }
// }

// 2. Detecting Code
const codeResult = ContentTypeClassifier.categorize(`function hello() {
    return "world";
}`);
console.log(codeResult);
// Output: {
// type: "code",
// content: "function hello() {...}",
// metadata: { codeLanguage: "javascript" }
// }

// 3. Detecting Currency
const currencyResult = ContentTypeClassifier.categorize("$1,234.56");
console.log(currencyResult);
// Output: {
//   type: "currency",
//   content: "$1,234.56",
//   metadata: { amount: 1234.56, currency: "$" }
// }

// 4. Detecting Social Posts
const socialResult = ContentTypeClassifier.categorize("Check out #typescript with @johnsmith!");
console.log(socialResult);
// Output: {
// type: "social",
// content: "Check out #typescript with @johnsmith!",
// metadata: {
// hashtags: ["#typescript"],
// mentions: ["@johnsmith"]
// }
// }

// 5. Detecting CSV
const csvResult = ContentTypeClassifier.categorize(`name,age,city
John,30,New York
Jane,25,Boston`);
console.log(csvResult);
// Output: {
// type: "csv",
// content: "name,age,city...",
// metadata: {
// structured: [
// { name: "John", age: "30", city: "New York" },
// { name: "Jane", age: "25", city: "Boston" }
// ]
// }
// }

// 6. Error Handling
try {
const result = ContentTypeClassifier.categorize("");
console.log(result);
} catch (error) {
console.error("Failed to categorize content:", error);
}

import { ContentTypeClassifier, ContentCategory } from 'content-type-classifier';

// With type checking
function processContent(content: string): void {
const result: ContentCategory = ContentTypeClassifier.categorize(content);

    switch(result.type) {
        case 'link':
            console.log("Found links:", result.metadata?.links);
            break;
        case 'code':
            console.log("Code language:", result.metadata?.codeLanguage);
            break;
        case 'currency':
            console.log("Amount:", result.metadata?.amount);
            console.log("Currency:", result.metadata?.currency);
            break;
        // ... handle other types
    }

}

// Processing multiple items
const contents = [
"https://example.com",
"$123.45",
"const x = 42;",
"#coding @typescript"
];

contents.forEach(content => {
const result = ContentTypeClassifier.categorize(content);
console.log(`Content type: ${result.type}`);
console.log("Metadata:", result.metadata);
});

The classifier supports these content types:

Links
Code
Lists
Email
JSON
Markdown
Equations
Dates
Social posts
Search queries
Phone numbers
Addresses
CSV data
XML content
SQL queries
File paths
Currency amounts
Product codes
