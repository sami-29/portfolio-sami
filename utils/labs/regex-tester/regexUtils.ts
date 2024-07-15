export interface RegexMatch {
  match: string;
  index: number;
  groups?: { [key: string]: string };
  namedGroups?: { [key: string]: string };
}

export interface RegexTestResult {
  isValid: boolean;
  matches: RegexMatch[];
  error?: string;
  flags: string;
  pattern: string;
}

export interface RegexExplanation {
  pattern: string;
  description: string;
}

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

export const regexFlags = [
  {
    value: "g",
    label: "Global",
    description: "Find all matches, not just the first",
  },
  {
    value: "i",
    label: "Ignore Case",
    description: "Case-insensitive matching",
  },
  { value: "m", label: "Multiline", description: "^$ match line breaks" },
  { value: "s", label: "Dot All", description: ". matches newlines" },
  { value: "u", label: "Unicode", description: "Full unicode support" },
  { value: "y", label: "Sticky", description: "Match only from lastIndex" },
];

export const commonPatterns = [
  {
    name: "Email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    description: "Basic email validation",
    testString: "user@example.com\ninvalid.email\ntest@domain.co.uk",
  },
  {
    name: "Phone (US)",
    pattern: "^\\+?1?[-. ]?\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$",
    description: "US phone number formats",
    testString: "(555) 123-4567\n555-123-4567\n+1 555 123 4567\n5551234567",
  },
  {
    name: "URL",
    pattern:
      "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$",
    description: "HTTP/HTTPS URL validation",
    testString:
      "https://www.example.com\nhttp://test.org/path?query=1\nftp://invalid.com",
  },
  {
    name: "Credit Card",
    pattern:
      "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$",
    description: "Major credit card formats",
    testString:
      "4532015112830366\n5555555555554444\n378282246310005\n1234567890123456",
  },
  {
    name: "IPv4 Address",
    pattern:
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    description: "IPv4 address validation",
    testString: "192.168.1.1\n127.0.0.1\n256.256.256.256\n10.0.0.1",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$",
    description: "ISO date format",
    testString: "2024-01-15\n2024-13-01\n2024-02-30\n2024-12-31",
  },
  {
    name: "Hex Color",
    pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
    description: "Hexadecimal color codes",
    testString: "#FF0000\n#f0f\n#123456\n#GGG\nFF0000",
  },
  {
    name: "Username",
    pattern: "^[a-zA-Z0-9_-]{3,16}$",
    description: "Alphanumeric, underscore, hyphen, 3-16 chars",
    testString: "valid_user\ninvalid-user-name-too-long\nno$pecialchar",
  },
  {
    name: "URL Slug",
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    description: "Lowercase alphanumeric and hyphens",
    testString: "this-is-a-valid-slug\nThis-Is-Not\n--invalid--\n-invalid-",
  },
  {
    name: "Strong Password",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special",
    testString: "Str0ngP@ss!\nweakpass\nNoDigit!",
  },
  {
    name: "HTML Tag",
    pattern: "<([a-z][a-z0-9]*)\\b[^>]*>([^<]*)<\\/\\1>",
    description: "Simple HTML tag matching",
    testString: "<p>Hello</p>\n<div>World</div>\n<br />\n<p>Mismatched</div>",
  },
  {
    name: "Markdown Image",
    pattern: "!\\[([^\\]]+)\\]\\(([^\\)]+)\\)",
    description: "Markdown image syntax",
    testString:
      "![alt text](image.jpg)\nThis is not an image\n![another one](/path/to/img.png)",
  },
];

export function testRegex(
  pattern: string,
  flags: string,
  testString: string
): RegexTestResult {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes("g")) {
      for (const match of Array.from(testString.matchAll(regex))) {
        matches.push({
          match: match[0],
          index: match.index!,
          groups: match
            .slice(1)
            .reduce(
              (acc: { [key: string]: string }, group: string, i: number) => {
                if (group !== undefined) acc[i.toString()] = group;
                return acc;
              },
              {}
            ),
          namedGroups: match.groups || {},
        });
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match
            .slice(1)
            .reduce(
              (acc: { [key: string]: string }, group: string, i: number) => {
                if (group !== undefined) acc[i.toString()] = group;
                return acc;
              },
              {}
            ),
          namedGroups: match.groups || {},
        });
      }
    }

    return {
      isValid: true,
      matches,
      flags,
      pattern,
    };
  } catch (error) {
    return {
      isValid: false,
      matches: [],
      error: error instanceof Error ? error.message : "Invalid regex pattern",
      flags,
      pattern,
    };
  }
}

export function explainRegex(pattern: string): RegexExplanation | null {
  try {
    // Validate pattern to avoid errors in generateDescription or elsewhere
    new RegExp(pattern);
    return {
      pattern,
      description: generateDescription(pattern),
    };
  } catch (e) {
    return null;
  }
}

function generateDescription(pattern: string): string {
  if (pattern.includes("@") && pattern.includes("\\.")) {
    return "Email address pattern";
  }
  if (pattern.includes("https?")) {
    return "URL pattern";
  }
  if (pattern.includes("\\d{4}") && pattern.includes("-")) {
    return "Date pattern";
  }
  if (pattern.startsWith("^") && pattern.endsWith("$")) {
    return "Full string match pattern";
  }
  if (pattern.includes("+") || pattern.includes("*")) {
    return "Pattern with repetition";
  }
  return "Custom regex pattern";
}

export function validateRegexPattern(pattern: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    new RegExp(pattern);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid pattern",
    };
  }
}
