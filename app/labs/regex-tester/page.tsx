"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Textarea,
  Input,
  Button,
  useColorModeValue,
  Checkbox,
  SimpleGrid,
  Alert,
  AlertIcon,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Code,
  Divider,
  Select,
  useToast,
  Tooltip,
  Flex,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { Copy, Info, Zap, BookOpen, Play } from "lucide-react";
import SEO from "../../../components/SEO";
import BackButton from "../../../components/BackButton";
import {
  testRegex,
  explainRegex,
  regexFlags,
  commonPatterns,
  regexTutorials,
  type RegexTestResult,
  type RegexExplanation,
} from "../../../utils/labs/regex-tester/regexUtils";

const RegexTesterPage = () => {
  const [pattern, setPattern] = useState(commonPatterns[0].pattern);
  const [testString, setTestString] = useState(commonPatterns[0].testString);
  const [result, setResult] = useState<RegexTestResult | null>(null);
  const [explanation, setExplanation] = useState<RegexExplanation | null>(null);
  const [selectedPattern, setSelectedPattern] = useState(
    commonPatterns[0].name
  );
  const [savedPatterns, setSavedPatterns] = useState<
    Array<{ name: string; pattern: string; description: string }>
  >([]);
  const [newPatternName, setNewPatternName] = useState("");
  const [newPatternDescription, setNewPatternDescription] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const successBg = useColorModeValue("green.50", "green.900");
  const errorBg = useColorModeValue("red.50", "red.900");
  const matchBoxBg = useColorModeValue("gray.50", "gray.700");
  const componentBoxBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    const saved = localStorage.getItem("regex-saved-patterns");
    if (saved) {
      try {
        setSavedPatterns(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved patterns");
      }
    }
  }, []);

  // Test the regex whenever inputs change
  useEffect(() => {
    if (pattern.trim()) {
      const testResult = testRegex(pattern, "gm", testString);
      setResult(testResult);

      if (testResult.isValid) {
        const regexExplanation = explainRegex(pattern);
        setExplanation(regexExplanation);
      } else {
        setExplanation(null);
      }
    }
  }, [pattern, testString]);

  const handlePatternSelect = (value: string) => {
    setSelectedPattern(value);
    if (value) {
      const selected = commonPatterns.find((p) => p.name === value);
      if (selected) {
        setPattern(selected.pattern);
        setTestString(selected.testString);
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} copied!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const savePattern = () => {
    if (!newPatternName.trim() || !pattern.trim()) {
      toast({
        title: "Missing fields",
        description: "Please provide both pattern name and regex pattern",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const newPattern = {
      name: newPatternName.trim(),
      pattern: pattern,
      description: newPatternDescription.trim() || "Custom pattern",
    };

    const updatedPatterns = [...savedPatterns, newPattern];
    setSavedPatterns(updatedPatterns);
    localStorage.setItem(
      "regex-saved-patterns",
      JSON.stringify(updatedPatterns)
    );

    setNewPatternName("");
    setNewPatternDescription("");

    toast({
      title: "Pattern saved!",
      description: `"${newPattern.name}" has been saved to your library`,
      status: "success",
      duration: 3000,
    });
  };

  const loadSavedPattern = (savedPattern: {
    name: string;
    pattern: string;
    description: string;
  }) => {
    setPattern(savedPattern.pattern);
    toast({
      title: "Pattern loaded!",
      description: `Loaded "${savedPattern.name}"`,
      status: "success",
      duration: 2000,
    });
  };

  const deleteSavedPattern = (index: number) => {
    const updatedPatterns = savedPatterns.filter((_, i) => i !== index);
    setSavedPatterns(updatedPatterns);
    localStorage.setItem(
      "regex-saved-patterns",
      JSON.stringify(updatedPatterns)
    );

    toast({
      title: "Pattern deleted",
      status: "info",
      duration: 2000,
    });
  };

  const highlightedText = useMemo(() => {
    if (!result?.isValid || !result.matches.length) {
      return testString.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Sort matches by index to handle them in order
    const sortedMatches = [...result.matches].sort((a, b) => a.index - b.index);

    let lastIndex = 0;
    const parts: string[] = [];
    const colorClass = `bg-yellow-200 dark:bg-yellow-700 font-semibold`;

    sortedMatches.forEach((match, index) => {
      // Add the text before the match
      if (match.index > lastIndex) {
        parts.push(
          testString
            .slice(lastIndex, match.index)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
        );
      }

      // Add the highlighted match
      parts.push(
        `<mark class="${colorClass}" title="Match ${index + 1}: ${
          match.match
        }">${match.match.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</mark>`
      );
      lastIndex = match.index + match.match.length;
    });

    // Add any remaining text after the last match
    if (lastIndex < testString.length) {
      parts.push(
        testString.slice(lastIndex).replace(/</g, "&lt;").replace(/>/g, "&gt;")
      );
    }

    return parts.join("");
  }, [result, testString]);

  return (
    <>
      <SEO
        title='Regex Tester - Interactive Regular Expression Tool'
        description='Test, debug, and understand regular expressions with live validation, pattern explanation, and common regex examples.'
        path='/labs/regex-tester'
      />

      <Box as='main' maxW='7xl' mx='auto' px={4} py={8}>
        <BackButton />
        <VStack spacing={8} align='stretch'>
          {/* Header */}
          <VStack spacing={4} textAlign='center'>
            <Heading as='h1' size='2xl' color={textColor}>
              <Icon as={Zap} display='inline' mr={2} />
              Regex Tester
            </Heading>
            <Text fontSize='lg' color={subTextColor} maxW='2xl'>
              Test, validate, and understand regular expressions with live
              feedback, pattern explanations, and common regex examples.
            </Text>
          </VStack>

          <Tabs
            variant='enclosed'
            colorScheme='blue'
            index={activeTab}
            onChange={setActiveTab}>
            <TabList>
              <Tab>
                <Icon as={Zap} mr={2} />
                Regex Tester
              </Tab>
              <Tab>
                <Icon as={BookOpen} mr={2} />
                Learn Regex
              </Tab>
            </TabList>

            <TabPanels>
              {/* Main Tester Tab */}
              <TabPanel px={0}>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                  {/* Input Section */}
                  <VStack spacing={6} align='stretch'>
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <Heading size='md' color={textColor}>
                          Pattern & Flags
                        </Heading>

                        {/* Common Patterns Dropdown */}
                        <Box>
                          <Text fontSize='sm' color={subTextColor} mb={2}>
                            Load Common Pattern:
                          </Text>
                          <Select
                            value={selectedPattern}
                            onChange={(e) =>
                              handlePatternSelect(e.target.value)
                            }
                            placeholder='Select a common pattern...'>
                            {commonPatterns.map((pattern) => (
                              <option key={pattern.name} value={pattern.name}>
                                {pattern.name} - {pattern.description}
                              </option>
                            ))}
                          </Select>
                        </Box>

                        <Divider />

                        {/* Pattern Input */}
                        <Box>
                          <HStack justify='space-between' mb={2}>
                            <Text fontSize='sm' color={subTextColor}>
                              Regular Expression:
                            </Text>
                            <Button
                              size='xs'
                              leftIcon={<Copy size={12} />}
                              onClick={() =>
                                copyToClipboard(pattern, "Pattern")
                              }>
                              Copy
                            </Button>
                          </HStack>
                          <Input
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder='Enter your regex pattern...'
                            fontFamily='mono'
                            isInvalid={result?.isValid === false}
                          />
                          {result?.error && (
                            <Text fontSize='sm' color='red.500' mt={1}>
                              {result.error}
                            </Text>
                          )}
                        </Box>

                        {/* Flags Section Removed */}

                        <Divider />

                        {/* Save Pattern Section */}
                        <VStack spacing={3} align='stretch'>
                          <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            color={textColor}>
                            💾 Save Current Pattern
                          </Text>
                          <Input
                            value={newPatternName}
                            onChange={(e) => setNewPatternName(e.target.value)}
                            placeholder="Pattern name (e.g., 'Email Validator')"
                            size='sm'
                          />
                          <Input
                            value={newPatternDescription}
                            onChange={(e) =>
                              setNewPatternDescription(e.target.value)
                            }
                            placeholder='Description (optional)'
                            size='sm'
                          />
                          <Button
                            onClick={savePattern}
                            size='sm'
                            colorScheme='green'>
                            Save Pattern
                          </Button>
                        </VStack>

                        {savedPatterns.length > 0 && (
                          <>
                            <Divider />
                            <VStack spacing={3} align='stretch'>
                              <Text
                                fontSize='sm'
                                fontWeight='semibold'
                                color={textColor}>
                                📚 Your Saved Patterns ({savedPatterns.length})
                              </Text>
                              <VStack
                                spacing={2}
                                align='stretch'
                                maxH='200px'
                                overflowY='auto'>
                                {savedPatterns.map((saved, index) => (
                                  <HStack
                                    key={index}
                                    p={2}
                                    bg={componentBoxBg}
                                    borderRadius='md'
                                    justify='space-between'>
                                    <VStack align='start' spacing={0} flex='1'>
                                      <Text fontSize='sm' fontWeight='semibold'>
                                        {saved.name}
                                      </Text>
                                      <Code fontSize='xs'>{saved.pattern}</Code>
                                      <Text fontSize='xs' color={subTextColor}>
                                        {saved.description}
                                      </Text>
                                    </VStack>
                                    <VStack spacing={1}>
                                      <Button
                                        size='xs'
                                        onClick={() => loadSavedPattern(saved)}>
                                        Load
                                      </Button>
                                      <Button
                                        size='xs'
                                        colorScheme='red'
                                        variant='ghost'
                                        onClick={() =>
                                          deleteSavedPattern(index)
                                        }>
                                        ×
                                      </Button>
                                    </VStack>
                                  </HStack>
                                ))}
                              </VStack>
                            </VStack>
                          </>
                        )}
                      </VStack>
                    </Box>

                    {/* Test String */}
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <HStack justify='space-between'>
                          <Heading size='md' color={textColor}>
                            Test String
                          </Heading>
                          <Button
                            size='sm'
                            leftIcon={<Copy size={14} />}
                            onClick={() =>
                              copyToClipboard(testString, "Test string")
                            }>
                            Copy
                          </Button>
                        </HStack>
                        <Textarea
                          value={testString}
                          onChange={(e) => setTestString(e.target.value)}
                          placeholder='Enter text to test against your regex...'
                          rows={8}
                          fontFamily='mono'
                          fontSize='sm'
                        />
                      </VStack>
                    </Box>
                  </VStack>

                  {/* Results Section */}
                  <VStack spacing={6} align='stretch'>
                    {/* Match Results */}
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <HStack justify='space-between'>
                          <Heading size='md' color={textColor}>
                            Results
                          </Heading>
                          {result?.isValid && (
                            <Badge
                              colorScheme={
                                result.matches.length > 0 ? "green" : "gray"
                              }>
                              {result.matches.length} match
                              {result.matches.length !== 1 ? "es" : ""}
                            </Badge>
                          )}
                        </HStack>

                        {result?.isValid ? (
                          <VStack spacing={4} align='stretch'>
                            {/* Highlighted Preview */}
                            <Box>
                              <Text fontSize='sm' color={subTextColor} mb={2}>
                                Text with matches highlighted:
                              </Text>
                              <Box
                                p={3}
                                bg={successBg}
                                borderRadius='md'
                                border='1px'
                                borderColor='green.200'
                                fontFamily='mono'
                                fontSize='sm'
                                whiteSpace='pre-wrap'
                                dangerouslySetInnerHTML={{
                                  __html: highlightedText,
                                }}
                              />
                            </Box>

                            {/* Match Details */}
                            {result.matches.length > 0 && (
                              <Accordion allowToggle>
                                <AccordionItem>
                                  <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                      <Text fontWeight='semibold'>
                                        Match Details
                                      </Text>
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                  <AccordionPanel pb={4}>
                                    <VStack spacing={3} align='stretch'>
                                      {result.matches.map((match, index) => (
                                        <Box
                                          key={index}
                                          p={3}
                                          bg={matchBoxBg}
                                          borderRadius='md'>
                                          <Text fontWeight='semibold' mb={1}>
                                            Match {index + 1}:
                                          </Text>
                                          <Text
                                            fontFamily='mono'
                                            fontSize='sm'
                                            mb={1}>
                                            <strong>Text:</strong> &quot;
                                            {match.match}
                                            &quot;
                                          </Text>
                                          <Text fontSize='sm' mb={1}>
                                            <strong>Position:</strong>{" "}
                                            {match.index} -{" "}
                                            {match.index +
                                              match.match.length -
                                              1}
                                          </Text>
                                          {Object.keys(match.groups || {})
                                            .length > 0 && (
                                            <Text fontSize='sm'>
                                              <strong>Groups:</strong>{" "}
                                              {JSON.stringify(match.groups)}
                                            </Text>
                                          )}
                                        </Box>
                                      ))}
                                    </VStack>
                                  </AccordionPanel>
                                </AccordionItem>
                              </Accordion>
                            )}
                          </VStack>
                        ) : (
                          <Alert status='error'>
                            <AlertIcon />
                            {result?.error || "Invalid regular expression"}
                          </Alert>
                        )}
                      </VStack>
                    </Box>

                    {/* Pattern Explanation */}
                    {explanation && (
                      <Box
                        bg={cardBg}
                        p={6}
                        borderRadius='xl'
                        border='1px'
                        borderColor={cardBorder}>
                        <VStack spacing={4} align='stretch'>
                          <HStack>
                            <Icon as={Info} />
                            <Heading size='md' color={textColor}>
                              Pattern Explanation
                            </Heading>
                          </HStack>

                          <Text
                            fontSize='sm'
                            color={subTextColor}
                            fontStyle='italic'>
                            {explanation.description}
                          </Text>
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </SimpleGrid>
              </TabPanel>

              {/* Tutorial Tab */}
              <TabPanel px={0}>
                <VStack spacing={6} align='stretch'>
                  {regexTutorials.map((tutorial, index) => (
                    <Box
                      key={index}
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <Heading size='md' color={textColor}>
                          {tutorial.title}
                        </Heading>
                        <VStack spacing={3} align='stretch'>
                          {tutorial.lessons.map((lesson, lessonIndex) => (
                            <Box
                              key={lessonIndex}
                              p={4}
                              bg={componentBoxBg}
                              borderRadius='md'>
                              <VStack spacing={3} align='stretch'>
                                <HStack justify='space-between' align='start'>
                                  <VStack align='start' spacing={1} flex='1'>
                                    <Code
                                      fontSize='sm'
                                      p={2}
                                      bg={cardBg}
                                      borderRadius='md'>
                                      {lesson.pattern}
                                    </Code>
                                    <Text fontSize='sm' color={subTextColor}>
                                      {lesson.description}
                                    </Text>
                                  </VStack>
                                  <Button
                                    size='sm'
                                    leftIcon={<Play size={14} />}
                                    onClick={() => {
                                      setPattern(lesson.pattern);
                                      setTestString(lesson.test);
                                      setActiveTab(0); // Switch to main tester tab
                                    }}>
                                    Try It
                                  </Button>
                                </HStack>
                                <Box
                                  p={2}
                                  bg={successBg}
                                  borderRadius='md'
                                  fontSize='sm'
                                  fontFamily='mono'>
                                  Test: {lesson.test.replace(/\n/g, " | ")}
                                </Box>
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </>
  );
};

export default RegexTesterPage;
