# Text Categorizer

A versatile utility for classifying and extracting metadata from various types of text content. This package can identify links, code snippets, currencies, social posts, CSV data, and more, making it a powerful tool for content analysis.

## Installation

Install the package using npm:

```bash
npm install text-categorizer
```

## Basic Usage

### Importing the Classifier

```javascript
import { TextCategorizer } from "text-categorizer";
```

### Classifying Text Content

```javascript
const result = TextCategorizer.categorize("your text here");
console.log(result);
```

## Features and Examples

### 1. Detecting Links

```javascript
const linkResult = TextCategorizer.categorize("https://www.example.com");
console.log(linkResult);
// Output:
// {
//   type: "link",
//   content: "https://www.example.com",
//   metadata: { links: ["https://www.example.com"] }
// }
```

### 2. Detecting Code

```javascript
const codeResult = TextCategorizer.categorize(function hello() {
  return "world";
});
console.log(codeResult);
// Output:
// {
//   type: "code",
//   content: "function hello() {...}",
//   metadata: { codeLanguage: "javascript" }
// }
```

### 3. Detecting Currency

```javascript
const currencyResult = TextCategorizer.categorize("$1,234.56");
console.log(currencyResult);
// Output:
// {
//   type: "currency",
//   content: "$1,234.56",
//   metadata: { amount: 1234.56, currency: "$" }
// }
```

### 4. Detecting Social Posts

```javascript
const socialResult = TextCategorizer.categorize(
  "Check out #typescript with @johnsmith!"
);
console.log(socialResult);
// Output:
// {
//   type: "social",
//   content: "Check out #typescript with @johnsmith!",
//   metadata: {
//     hashtags: ["#typescript"],
//     mentions: ["@johnsmith"]
//   }
// }
```

### 5. Detecting CSV

```javascript
const csvResult = TextCategorizer.categorize(
  "name,age,city\nJohn,30,New York\nJane,25,Boston"
);
console.log(csvResult);
// Output:
// {
//   type: "csv",
//   content: "name,age,city...",
//   metadata: {
//     structured: [
//       { name: "John", age: "30", city: "New York" },
//       { name: "Jane", age: "25", city: "Boston" }
//     ]
//   }
// }
```

### 6. Error Handling

```javascript
try {
  const result = TextCategorizer.categorize("");
  console.log(result);
} catch (error) {
  console.error("Failed to categorize content:", error);
}
```

### 7. Type Checking

```javascript
import { TextCategorizer, ContentCategory } from "text-categorizer";

function processContent(content: string): void {
  const result: ContentCategory = TextCategorizer.categorize(content);

  switch (result.type) {
    case "link":
      console.log("Found links:", result.metadata?.links);
      break;
    case "code":
      console.log("Code language:", result.metadata?.codeLanguage);
      break;
    case "currency":
      console.log("Amount:", result.metadata?.amount);
      console.log("Currency:", result.metadata?.currency);
      break;
    // Handle other types...
  }
}
```

### 8. Processing Multiple Items

```javascript
const contents = [
  "https://example.com",
  "$123.45",
  "const x = 42;",
  "#coding @typescript"
];

contents.forEach((content) => {
  const result = TextCategorizer.categorize(content);
  console.log(`Content type: ${result.type}`);
  console.log("Metadata:", result.metadata);
});
```

## Supported Content Types

The classifier supports the following content types:

- Links
- Code
- Lists
- Email
- JSON
- Markdown
- Equations
- Dates
- Social posts
- Search queries
- Phone numbers
- Addresses
- CSV data
- XML content
- SQL queries
- File paths
- Currency amounts
- Product codes

## TODO

- Measurements

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on the [GitHub repository](https://github.com/usmangurowa/text-categorizer).

## License

This project is licensed under the MIT License.

## Cloning and Running Locally

If you want to clone the repository and run it on your machine, you can do so with the following commands:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/usmangurowa/text-categorizer.git
   ```

2. **Change directory:**

   ```bash
   cd text-categorizer
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Build the application:**

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Run tests:**
   ```bash
   npm test
   # or
   yarn test
   ```

---

Enjoy using `text-categorizer`!
