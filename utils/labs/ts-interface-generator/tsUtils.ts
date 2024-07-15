export interface GenerationOptions {
  interfaceName: string;
  exportInterface: boolean;
  optionalFields: boolean;
  useUnionTypes: boolean;
  generateComments: boolean;
  sortFields: boolean;
  indentSize: number;
  dateFormat: "Date" | "string" | "number";
  arrayFormat: "T[]" | "Array<T>";
  nullHandling: "null" | "undefined" | "nullish";
  outputFormat: "typescript" | "jsdoc";
  useGenerics: boolean;
  strictNullChecks: boolean;
  generateUtilityTypes: boolean;
}

export interface GenerationResult {
  success: boolean;
  interface?: string;
  error?: string;
  warnings?: string[];
  statistics?: {
    totalFields: number;
    nestedObjects: number;
    arrayFields: number;
    complexTypes: number;
  };
}

export const defaultOptions: GenerationOptions = {
  interfaceName: "ApiResponse",
  exportInterface: true,
  optionalFields: true,
  useUnionTypes: true,
  generateComments: false,
  sortFields: true,
  indentSize: 2,
  dateFormat: "Date",
  arrayFormat: "T[]",
  nullHandling: "nullish",
  outputFormat: "typescript",
  useGenerics: false,
  strictNullChecks: true,
  generateUtilityTypes: false,
};

export const regexTutorials = [
  {
    title: "Anchors & Boundaries",
    lessons: [
      {
        pattern: "^hello",
        description: "Matches 'hello' at the start of a line",
        test: "hello world\nhi hello",
      },
      {
        pattern: "world$",
        description: "Matches 'world' at the end of a line",
        test: "hello world\nworld peace",
      },
      {
        pattern: "\\bcat\\b",
        description: "Matches 'cat' as a whole word",
        test: "cat\ncatch\nthe cat sat",
      },
    ],
  },
  {
    title: "Character Classes",
    lessons: [
      {
        pattern: "[abc]",
        description: "Matches any single character a, b, or c",
        test: "apple\nbanana\ncherry\ndog",
      },
      {
        pattern: "[a-z]",
        description: "Matches any lowercase letter",
        test: "Hello\nworld\n123",
      },
      {
        pattern: "[^0-9]",
        description: "Matches any character that is NOT a digit",
        test: "abc123\n!@#\n789",
      },
    ],
  },
  {
    title: "Quantifiers",
    lessons: [
      {
        pattern: "a*",
        description: "Matches zero or more 'a' characters",
        test: "b\na\naa\naaa",
      },
      {
        pattern: "a+",
        description: "Matches one or more 'a' characters",
        test: "b\na\naa\naaa",
      },
      {
        pattern: "a?",
        description: "Matches zero or one 'a' character",
        test: "b\na\naa",
      },
      {
        pattern: "a{2,4}",
        description: "Matches between 2 and 4 'a' characters",
        test: "a\naa\naaa\naaaa\naaaaa",
      },
    ],
  },
];

export function generateInterface(
  jsonInput: string,
  options: GenerationOptions
): GenerationResult {
  try {
    let parsedData: any;
    try {
      parsedData = JSON.parse(jsonInput);
    } catch (parseError) {
      return {
        success: false,
        error: "Invalid JSON format",
      };
    }

    if (!parsedData) {
      return {
        success: false,
        error: "Empty data provided",
      };
    }

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      const interfaceCode = generateUnionTypeFromArray(parsedData, options);

      const statistics = {
        totalFields: countFields(parsedData[0]),
        nestedObjects: countNestedObjects(parsedData[0]),
        arrayFields: countArrayFields(parsedData[0]),
        complexTypes: countComplexTypes(parsedData[0]),
      };

      return {
        success: true,
        interface: interfaceCode,
        warnings: [],
        statistics,
      };
    }

    const interfaceCode = generateInterfaceFromData(parsedData, options);

    const statistics = {
      totalFields: countFields(parsedData),
      nestedObjects: countNestedObjects(parsedData),
      arrayFields: countArrayFields(parsedData),
      complexTypes: countComplexTypes(parsedData),
    };

    const warnings: string[] = [];
    if (statistics.nestedObjects > 5) {
      warnings.push(
        "This object has many nested levels - consider flattening the structure"
      );
    }

    const finalCode =
      options.outputFormat === "jsdoc"
        ? generateJSDocFromData(parsedData, options)
        : interfaceCode;

    return {
      success: true,
      interface: finalCode,
      warnings,
      statistics,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

function generateInterfaceFromData(
  data: any,
  options: GenerationOptions
): string {
  let code = "";

  if (options.generateComments) {
    code += "/**\n";
    code += " * Generated TypeScript interface\n";
    code += ` * Created: ${new Date().toISOString()}\n`;
    code += " */\n";
  }

  const exportKeyword = options.exportInterface ? "export " : "";
  code += `${exportKeyword}interface ${options.interfaceName} {\n`;

  code += generateFieldsFromObject(data, options, 1);

  code += "}";

  return code;
}

function generateUnionTypeFromArray(
  dataArray: any[],
  options: GenerationOptions
): string {
  let code = "";

  if (options.generateComments) {
    code += "/**\n";
    code += " * Generated TypeScript union types from array\n";
    code += ` * Created: ${new Date().toISOString()}\n`;
    code += ` * Analyzed ${dataArray.length} items\n`;
    code += " */\n";
  }

  const typeVariants = new Map<string, any>();

  dataArray.forEach((item, index) => {
    if (typeof item === "object" && item !== null) {
      const signature = createObjectSignature(item);
      if (!typeVariants.has(signature)) {
        typeVariants.set(signature, {
          example: item,
          count: 1,
          indices: [index],
        });
      } else {
        typeVariants.get(signature)!.count++;
        typeVariants.get(signature)!.indices.push(index);
      }
    }
  });

  if (typeVariants.size > 1) {
    const exportKeyword = options.exportInterface ? "export " : "";
    code += `${exportKeyword}type ${options.interfaceName} = `;

    const unionTypes: string[] = [];
    let variantIndex = 1;

    typeVariants.forEach(({ example, count, indices }) => {
      const variantName = `${options.interfaceName}Variant${variantIndex}`;
      unionTypes.push(variantName);
      variantIndex++;
    });

    code += unionTypes.join(" | ") + ";\n\n";

    variantIndex = 1;
    typeVariants.forEach(({ example, count, indices }) => {
      const variantName = `${options.interfaceName}Variant${variantIndex}`;

      if (options.generateComments) {
        code += `/** Variant found in ${count} out of ${
          dataArray.length
        } items (indices: ${indices.slice(0, 3).join(", ")}${
          indices.length > 3 ? "..." : ""
        }) */\n`;
      }

      code += `interface ${variantName} {\n`;
      code += generateFieldsFromObject(example, options, 1);
      code += "}\n\n";

      variantIndex++;
    });
  } else {
    const exportKeyword = options.exportInterface ? "export " : "";
    code += `${exportKeyword}type ${options.interfaceName} = ${options.interfaceName}Item[];\n\n`;
    code += `interface ${options.interfaceName}Item {\n`;
    code += generateFieldsFromObject(dataArray[0], options, 1);
    code += "}";
  }

  return code;
}

function createObjectSignature(obj: any): string {
  if (typeof obj !== "object" || obj === null) {
    return typeof obj;
  }

  const keys = Object.keys(obj).sort();
  const signature = keys
    .map((key) => {
      const value = obj[key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return `${key}:object`;
      } else if (Array.isArray(value)) {
        return `${key}:array`;
      } else {
        return `${key}:${typeof value}`;
      }
    })
    .join(",");

  return signature;
}

function generateFieldsFromObject(
  obj: any,
  options: GenerationOptions,
  depth: number
): string {
  const indent = " ".repeat(options.indentSize * depth);
  let code = "";

  if (typeof obj !== "object" || obj === null) {
    return code;
  }

  const keys = options.sortFields ? Object.keys(obj).sort() : Object.keys(obj);

  keys.forEach((key) => {
    const value = obj[key];
    const fieldType = getTypeFromValue(value, options, depth + 1);

    const isOptional =
      options.optionalFields && (value === null || value === undefined);
    const optionalMarker = isOptional ? "?" : "";

    if (options.generateComments) {
      const example = JSON.stringify(value);
      const truncatedExample =
        example.length > 50 ? example.substring(0, 50) + "..." : example;
      code += `${indent}/** Example: ${truncatedExample} */\n`;
    }

    code += `${indent}${key}${optionalMarker}: ${fieldType};\n`;
  });

  return code;
}

function getTypeFromValue(
  value: any,
  options: GenerationOptions,
  depth: number
): string {
  if (value === null) {
    return options.nullHandling === "null"
      ? "null"
      : options.nullHandling === "undefined"
      ? "undefined"
      : "null | undefined";
  }

  if (value === undefined) {
    return "undefined";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "any[]";
    }

    const elementTypes = new Set<string>();
    value.slice(0, 3).forEach((item) => {
      elementTypes.add(getTypeFromValue(item, options, depth));
    });

    const elementType =
      elementTypes.size === 1
        ? Array.from(elementTypes)[0]
        : Array.from(elementTypes).join(" | ");

    return options.arrayFormat === "T[]"
      ? `(${elementType})[]`
      : `Array<${elementType}>`;
  }

  const jsType = typeof value;

  switch (jsType) {
    case "string":
      if (isDateString(value)) {
        return options.dateFormat;
      }
      return "string";

    case "number":
      return "number";

    case "boolean":
      return "boolean";

    case "object":
      if (depth > 10) {
        return "any";
      }

      const indent = " ".repeat(options.indentSize * depth);
      const baseIndent = " ".repeat(options.indentSize * (depth - 1));
      let nestedCode = "{\n";
      nestedCode += generateFieldsFromObject(value, options, depth);
      nestedCode += `${baseIndent}}`;
      return nestedCode;

    default:
      return "any";
  }
}

function generateJSDocFromData(data: any, options: GenerationOptions): string {
  let code = "";

  if (options.generateComments) {
    code += "/**\n";
    code += " * Generated JSDoc Type Definitions\n";
    code += ` * Created: ${new Date().toISOString()}\n`;
    code += " */\n\n";
  }

  code += `/**\n`;
  code += ` * @typedef {Object} ${options.interfaceName}\n`;

  if (typeof data === "object" && data !== null) {
    const keys = options.sortFields
      ? Object.keys(data).sort()
      : Object.keys(data);

    keys.forEach((key) => {
      const value = data[key];
      const jsDocType = getJSDocTypeFromValue(value);
      code += ` * @property {${jsDocType}} ${key}`;

      if (options.generateComments) {
        const example = JSON.stringify(value);
        const truncatedExample =
          example.length > 30 ? example.substring(0, 30) + "..." : example;
        code += ` - ${truncatedExample}`;
      }

      code += "\n";
    });
  }

  code += " */\n";

  return code;
}

function getJSDocTypeFromValue(value: any): string {
  if (value === null || value === undefined) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "Array";
    }
    const elementType = getJSDocTypeFromValue(value[0]);
    return `${elementType}[]`;
  }

  const jsType = typeof value;

  switch (jsType) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "Object";
    default:
      return "any";
  }
}

function isDateString(str: string): boolean {
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO format
    /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}/, // DD-MM-YYYY
  ];

  return (
    datePatterns.some((pattern) => pattern.test(str)) && !isNaN(Date.parse(str))
  );
}

function countFields(obj: any): number {
  if (typeof obj !== "object" || obj === null) return 0;
  let count = Object.keys(obj).length;

  Object.values(obj).forEach((value) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count += countFields(value);
    }
  });

  return count;
}

function countNestedObjects(obj: any): number {
  if (typeof obj !== "object" || obj === null) return 0;

  let count = 0;
  Object.values(obj).forEach((value) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      count++;
      count += countNestedObjects(value);
    }
  });

  return count;
}

function countArrayFields(obj: any): number {
  if (typeof obj !== "object" || obj === null) return 0;

  let count = 0;
  Object.values(obj).forEach((value) => {
    if (Array.isArray(value)) {
      count++;
    } else if (typeof value === "object" && value !== null) {
      count += countArrayFields(value);
    }
  });

  return count;
}

function countComplexTypes(obj: any): number {
  if (typeof obj !== "object" || obj === null) return 0;

  let count = 0;
  Object.values(obj).forEach((value) => {
    if (Array.isArray(value) && value.length > 0) {
      const types = new Set(value.slice(0, 3).map((item) => typeof item));
      if (types.size > 1) count++;
    } else if (typeof value === "object" && value !== null) {
      count += countComplexTypes(value);
    }
  });

  return count;
}

export function validateJson(input: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    JSON.parse(input);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
}

export function validateInterfaceName(name: string): {
  isValid: boolean;
  error?: string;
} {
  const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

  if (!name.trim()) {
    return { isValid: false, error: "Interface name cannot be empty" };
  }

  if (!identifierRegex.test(name)) {
    return { isValid: false, error: "Invalid interface name format" };
  }

  const keywords = [
    "interface",
    "type",
    "class",
    "function",
    "var",
    "let",
    "const",
    "import",
    "export",
  ];
  if (keywords.includes(name.toLowerCase())) {
    return {
      isValid: false,
      error: "Interface name cannot be a TypeScript keyword",
    };
  }

  return { isValid: true };
}

export const sampleJsonExamples = [
  {
    name: "User Profile",
    description: "A typical user profile object",
    json: JSON.stringify(
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        isActive: true,
        profile: {
          bio: "Software developer",
          avatar: "https://example.com/avatar.jpg",
          social: {
            twitter: "@johndoe",
            github: "johndoe",
          },
        },
        skills: ["JavaScript", "TypeScript", "React"],
        createdAt: "2024-01-15T10:30:00Z",
      },
      null,
      2
    ),
  },
  {
    name: "Product Catalog",
    description: "E-commerce product data",
    json: JSON.stringify(
      [
        {
          id: "prod-001",
          name: "Wireless Headphones",
          price: 99.99,
          category: "Electronics",
          inStock: true,
          tags: ["wireless", "bluetooth", "audio"],
          specifications: {
            batteryLife: "20 hours",
            connectivity: "Bluetooth 5.0",
            weight: "250g",
          },
          reviews: [
            {
              rating: 5,
              comment: "Great sound quality!",
              reviewer: "Alice Smith",
              date: "2024-01-10",
            },
          ],
        },
        {
          id: "prod-002",
          name: "Smart Watch",
          price: 299.99,
          category: "Wearables",
          inStock: false,
          tags: ["smart", "fitness", "notifications"],
          specifications: {
            displaySize: "1.4 inches",
            batteryLife: "5 days",
            waterproof: true,
          },
          reviews: [],
        },
      ],
      null,
      2
    ),
  },
  {
    name: "API Response",
    description: "RESTful API response structure",
    json: JSON.stringify(
      {
        success: true,
        data: {
          users: [
            {
              id: 1,
              username: "alice",
              email: "alice@example.com",
              role: "admin",
              lastLogin: "2024-01-15T14:30:00Z",
            },
            {
              id: 2,
              username: "bob",
              email: "bob@example.com",
              role: "user",
              lastLogin: null,
            },
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 25,
            hasNext: true,
          },
        },
        meta: {
          requestId: "req-12345",
          timestamp: "2024-01-15T14:35:00Z",
          version: "1.0.0",
        },
      },
      null,
      2
    ),
  },
  {
    name: "Mixed Data Types",
    description:
      "Object with various data types including unions and optional fields",
    json: JSON.stringify(
      {
        id: 123,
        name: "John Doe",
        email: null,
        age: 30,
        isActive: true,
        profile: {
          bio: "Developer",
          avatar: null,
          settings: {
            theme: "dark",
            notifications: true,
            privacy: "public",
          },
        },
        roles: ["admin", "user"],
        metadata: {
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: null,
          version: 1.2,
        },
        tags: ["typescript", "react", "nodejs"],
        preferences: {},
      },
      null,
      2
    ),
  },
  {
    name: "Union Types Example",
    description: "Data that demonstrates union type generation",
    json: JSON.stringify(
      [
        {
          type: "text",
          content: "Hello world",
          timestamp: "2024-01-15T10:00:00Z",
        },
        {
          type: "image",
          content: {
            url: "https://example.com/image.jpg",
            width: 800,
            height: 600,
            alt: "Sample image",
          },
          timestamp: 1705312800000,
        },
        {
          type: "video",
          content: {
            url: "https://example.com/video.mp4",
            duration: 120,
            thumbnail: "https://example.com/thumb.jpg",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      null,
      2
    ),
  },
  {
    name: "E-commerce Order",
    description: "Complex order structure with optional fields and arrays",
    json: JSON.stringify(
      {
        orderId: "ORD-2024-001",
        status: "completed",
        customer: {
          id: 456,
          email: "customer@example.com",
          name: "Jane Smith",
          phone: "+1-555-0123",
        },
        items: [
          {
            productId: "PROD-001",
            name: "Laptop",
            price: 999.99,
            quantity: 1,
            variant: {
              color: "silver",
              storage: "512GB",
              ram: "16GB",
            },
            discount: null,
          },
          {
            productId: "PROD-002",
            name: "Mouse",
            price: 29.99,
            quantity: 2,
            variant: null,
            discount: {
              type: "percentage",
              value: 10,
            },
          },
        ],
        shipping: {
          address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "US",
          },
          method: "standard",
          cost: 9.99,
          estimatedDelivery: "2024-01-20",
        },
        payment: {
          method: "credit_card",
          last4: "4242",
          amount: 2069.97,
          currency: "USD",
          fee: 30.12,
        },
        createdAt: "2024-01-15T14:30:00Z",
        updatedAt: "2024-01-16T09:15:00Z",
      },
      null,
      2
    ),
  },
  {
    name: "GraphQL Response",
    description: "Complex GraphQL query response with nested data",
    json: JSON.stringify(
      {
        data: {
          viewer: {
            id: "user-123",
            name: "John Doe",
            avatar: {
              url: "https://example.com/avatar.jpg",
              width: 256,
              height: 256,
            },
            repositories: {
              nodes: [
                {
                  id: "repo-1",
                  name: "awesome-project",
                  description: "An awesome project",
                  stargazerCount: 42,
                  forkCount: 7,
                  languages: {
                    edges: [
                      { node: { name: "TypeScript", color: "#3178c6" } },
                      { node: { name: "JavaScript", color: "#f1e05a" } },
                    ],
                  },
                },
              ],
              totalCount: 15,
            },
          },
        },
        extensions: {
          tracing: {
            version: 1,
            startTime: "2024-01-15T10:00:00.000Z",
            endTime: "2024-01-15T10:00:00.100Z",
            duration: 100000000,
          },
        },
      },
      null,
      2
    ),
  },
];
