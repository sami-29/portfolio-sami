"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Textarea,
  Button,
  useColorModeValue,
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
  Select,
  Input,
  useToast,
  Flex,
  Icon,
  Divider,
  Switch,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { Copy, Settings, Code2, FileType, Zap } from "lucide-react";
import SEO from "../../../components/SEO";
import BackButton from "../../../components/BackButton";
import {
  generateInterface,
  validateJson,
  validateInterfaceName,
  defaultOptions,
  sampleJsonExamples,
  type GenerationOptions,
  type GenerationResult,
} from "../../../utils/labs/ts-interface-generator/tsUtils";

const TypeScriptInterfaceGeneratorPage = () => {
  const [jsonInput, setJsonInput] = useState(sampleJsonExamples[0].json);
  const [options, setOptions] = useState<GenerationOptions>(defaultOptions);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [selectedExample, setSelectedExample] = useState(
    sampleJsonExamples[0].name
  );

  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const successBg = useColorModeValue("green.50", "green.900");
  const errorBg = useColorModeValue("red.50", "red.900");
  const codeBg = useColorModeValue("gray.50", "gray.900");

  // Generate interface whenever inputs change
  useEffect(() => {
    if (jsonInput.trim()) {
      const generationResult = generateInterface(jsonInput, options);
      setResult(generationResult);
    }
  }, [jsonInput, options]);

  const handleExampleSelect = (exampleName: string) => {
    setSelectedExample(exampleName);
    const example = sampleJsonExamples.find((ex) => ex.name === exampleName);
    if (example) {
      setJsonInput(example.json);
    }
  };

  const updateOption = <K extends keyof GenerationOptions>(
    key: K,
    value: GenerationOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
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

  const jsonValidation = useMemo(() => validateJson(jsonInput), [jsonInput]);
  const nameValidation = useMemo(
    () => validateInterfaceName(options.interfaceName),
    [options.interfaceName]
  );

  return (
    <>
      <SEO
        title='Type Definition Generator - JSON to TypeScript & JSDoc Tool'
        description='Convert JSON to TypeScript interfaces or JSDoc types with intelligent detection, complex types, generics, and advanced generation options.'
        path='/labs/ts-interface-generator'
      />

      <Box as='main' maxW='7xl' mx='auto' px={4} py={8}>
        <BackButton />
        <VStack spacing={8} align='stretch'>
          {/* Header */}
          <VStack spacing={4} textAlign='center'>
            <Heading as='h1' size='2xl' color={textColor}>
              <Icon as={Code2} display='inline' mr={2} />
              Type Definition Generator
            </Heading>
            <Text fontSize='lg' color={subTextColor} maxW='3xl'>
              Convert JSON to TypeScript interfaces or JSDoc typedefs with
              intelligent type detection, complex type support, and advanced
              generation options. Perfect for API integration and type safety.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Input Section */}
            <VStack spacing={6} align='stretch'>
              {/* JSON Input */}
              <Box
                bg={cardBg}
                p={6}
                borderRadius='xl'
                border='1px'
                borderColor={cardBorder}>
                <VStack spacing={4} align='stretch'>
                  <HStack justify='space-between'>
                    <Heading size='md' color={textColor}>
                      JSON Input
                    </Heading>
                    <Select
                      value={selectedExample}
                      onChange={(e) => handleExampleSelect(e.target.value)}
                      size='sm'
                      maxW='250px'>
                      {sampleJsonExamples.map((example) => (
                        <option key={example.name} value={example.name}>
                          {example.name}
                        </option>
                      ))}
                    </Select>
                  </HStack>

                  <Text fontSize='sm' color={subTextColor}>
                    {
                      sampleJsonExamples.find(
                        (ex) => ex.name === selectedExample
                      )?.description
                    }
                  </Text>

                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Paste your JSON data here...'
                    rows={12}
                    fontFamily='mono'
                    fontSize='sm'
                    isInvalid={!jsonValidation.isValid}
                  />

                  {!jsonValidation.isValid && (
                    <Alert status='error' size='sm'>
                      <AlertIcon />
                      {jsonValidation.error}
                    </Alert>
                  )}

                  {jsonValidation.isValid && (
                    <Alert status='success' size='sm'>
                      <AlertIcon />
                      Valid JSON format
                    </Alert>
                  )}
                </VStack>
              </Box>

              {/* Options */}
              <Box
                bg={cardBg}
                p={6}
                borderRadius='xl'
                border='1px'
                borderColor={cardBorder}>
                <VStack spacing={4} align='stretch'>
                  <HStack>
                    <Icon as={Settings} />
                    <Heading size='md' color={textColor}>
                      Generation Options
                    </Heading>
                  </HStack>

                  <Tabs variant='enclosed' size='sm'>
                    <TabList>
                      <Tab>Basic</Tab>
                      <Tab>Advanced</Tab>
                      <Tab>Formatting</Tab>
                    </TabList>

                    <TabPanels>
                      {/* Basic Options */}
                      <TabPanel px={0}>
                        <VStack spacing={4} align='stretch'>
                          <FormControl>
                            <FormLabel fontSize='sm'>Interface Name</FormLabel>
                            <Input
                              value={options.interfaceName}
                              onChange={(e) =>
                                updateOption("interfaceName", e.target.value)
                              }
                              size='sm'
                              isInvalid={!nameValidation.isValid}
                            />
                            {!nameValidation.isValid && (
                              <Text fontSize='xs' color='red.500' mt={1}>
                                {nameValidation.error}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl display='flex' alignItems='center'>
                            <FormLabel
                              htmlFor='export-interface'
                              mb='0'
                              fontSize='sm'>
                              Export Interface
                            </FormLabel>
                            <Switch
                              id='export-interface'
                              isChecked={options.exportInterface}
                              onChange={(e) =>
                                updateOption(
                                  "exportInterface",
                                  e.target.checked
                                )
                              }
                            />
                          </FormControl>

                          <FormControl display='flex' alignItems='center'>
                            <FormLabel
                              htmlFor='optional-fields'
                              mb='0'
                              fontSize='sm'>
                              Make Inconsistent Fields Optional
                            </FormLabel>
                            <Switch
                              id='optional-fields'
                              isChecked={options.optionalFields}
                              onChange={(e) =>
                                updateOption("optionalFields", e.target.checked)
                              }
                            />
                          </FormControl>

                          <FormControl display='flex' alignItems='center'>
                            <FormLabel
                              htmlFor='union-types'
                              mb='0'
                              fontSize='sm'>
                              Use Union Types for Mixed Types
                            </FormLabel>
                            <Switch
                              id='union-types'
                              isChecked={options.useUnionTypes}
                              onChange={(e) =>
                                updateOption("useUnionTypes", e.target.checked)
                              }
                            />
                          </FormControl>
                        </VStack>
                      </TabPanel>

                      {/* Advanced Options */}
                      <TabPanel px={0}>
                        <VStack spacing={4} align='stretch'>
                          <FormControl>
                            <FormLabel fontSize='sm'>Output Format</FormLabel>
                            <Select
                              value={options.outputFormat}
                              onChange={(e) =>
                                updateOption(
                                  "outputFormat",
                                  e.target.value as any
                                )
                              }
                              size='sm'>
                              <option value='typescript'>
                                TypeScript Interface
                              </option>
                              <option value='jsdoc'>
                                JSDoc Type Definition
                              </option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize='sm'>Date Format</FormLabel>
                            <Select
                              value={options.dateFormat}
                              onChange={(e) =>
                                updateOption(
                                  "dateFormat",
                                  e.target.value as any
                                )
                              }
                              size='sm'>
                              <option value='Date'>Date</option>
                              <option value='string'>string</option>
                              <option value='number'>number</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize='sm'>Array Format</FormLabel>
                            <Select
                              value={options.arrayFormat}
                              onChange={(e) =>
                                updateOption(
                                  "arrayFormat",
                                  e.target.value as any
                                )
                              }
                              size='sm'>
                              <option value='T[]'>T[]</option>
                              <option value='Array<T>'>Array&lt;T&gt;</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize='sm'>Null Handling</FormLabel>
                            <Select
                              value={options.nullHandling}
                              onChange={(e) =>
                                updateOption(
                                  "nullHandling",
                                  e.target.value as any
                                )
                              }
                              size='sm'>
                              <option value='null'>null</option>
                              <option value='undefined'>undefined</option>
                              <option value='nullish'>null | undefined</option>
                            </Select>
                          </FormControl>
                        </VStack>
                      </TabPanel>

                      {/* Formatting Options */}
                      <TabPanel px={0}>
                        <VStack spacing={4} align='stretch'>
                          <FormControl display='flex' alignItems='center'>
                            <FormLabel
                              htmlFor='generate-comments'
                              mb='0'
                              fontSize='sm'>
                              Generate Comments
                            </FormLabel>
                            <Switch
                              id='generate-comments'
                              isChecked={options.generateComments}
                              onChange={(e) =>
                                updateOption(
                                  "generateComments",
                                  e.target.checked
                                )
                              }
                            />
                          </FormControl>

                          <FormControl display='flex' alignItems='center'>
                            <FormLabel
                              htmlFor='sort-fields'
                              mb='0'
                              fontSize='sm'>
                              Sort Fields Alphabetically
                            </FormLabel>
                            <Switch
                              id='sort-fields'
                              isChecked={options.sortFields}
                              onChange={(e) =>
                                updateOption("sortFields", e.target.checked)
                              }
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize='sm'>Indent Size</FormLabel>
                            <NumberInput
                              value={options.indentSize}
                              onChange={(_, value) =>
                                updateOption("indentSize", value)
                              }
                              min={1}
                              max={8}
                              size='sm'>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </VStack>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </VStack>
              </Box>
            </VStack>

            {/* Output Section */}
            <VStack spacing={6} align='stretch'>
              {/* Generated Interface */}
              <Box
                bg={cardBg}
                p={6}
                borderRadius='xl'
                border='1px'
                borderColor={cardBorder}>
                <VStack spacing={4} align='stretch'>
                  <HStack justify='space-between'>
                    <HStack>
                      <Icon as={FileType} />
                      <Heading size='md' color={textColor}>
                        Generated Interface
                      </Heading>
                    </HStack>
                    <Button
                      size='sm'
                      leftIcon={<Copy size={14} />}
                      onClick={() =>
                        copyToClipboard(result?.interface || "", "Interface")
                      }
                      isDisabled={!result?.success}>
                      Copy
                    </Button>
                  </HStack>

                  {result?.success ? (
                    <Box
                      p={4}
                      bg={codeBg}
                      borderRadius='md'
                      border='1px'
                      borderColor={cardBorder}
                      fontFamily='mono'
                      fontSize='sm'
                      whiteSpace='pre-wrap'
                      overflow='auto'
                      maxH='400px'>
                      <Text
                        as='pre'
                        whiteSpace='pre-wrap'
                        fontSize='sm'
                        fontFamily='mono'>
                        {result.interface}
                      </Text>
                    </Box>
                  ) : (
                    <Alert status='error'>
                      <AlertIcon />
                      {result?.error || "No interface generated"}
                    </Alert>
                  )}
                </VStack>
              </Box>

              {/* Statistics & Warnings */}
              {result?.success && (
                <>
                  {/* Statistics */}
                  {result.statistics && (
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <Heading size='md' color={textColor}>
                          Statistics
                        </Heading>
                        <StatGroup>
                          <Stat>
                            <StatLabel fontSize='sm'>Total Fields</StatLabel>
                            <StatNumber fontSize='lg'>
                              {result.statistics.totalFields}
                            </StatNumber>
                          </Stat>
                          <Stat>
                            <StatLabel fontSize='sm'>Nested Objects</StatLabel>
                            <StatNumber fontSize='lg'>
                              {result.statistics.nestedObjects}
                            </StatNumber>
                          </Stat>
                          <Stat>
                            <StatLabel fontSize='sm'>Array Fields</StatLabel>
                            <StatNumber fontSize='lg'>
                              {result.statistics.arrayFields}
                            </StatNumber>
                          </Stat>
                          <Stat>
                            <StatLabel fontSize='sm'>Complex Types</StatLabel>
                            <StatNumber fontSize='lg'>
                              {result.statistics.complexTypes}
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </VStack>
                    </Box>
                  )}

                  {/* Warnings */}
                  {result.warnings && result.warnings.length > 0 && (
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <Heading size='md' color={textColor}>
                          ⚠️ Warnings
                        </Heading>
                        <VStack spacing={2} align='stretch'>
                          {result.warnings.map((warning, index) => (
                            <Alert key={index} status='warning' size='sm'>
                              <AlertIcon />
                              <Text fontSize='sm'>{warning}</Text>
                            </Alert>
                          ))}
                        </VStack>
                      </VStack>
                    </Box>
                  )}
                </>
              )}
            </VStack>
          </SimpleGrid>

          {/* Features Overview */}
          <Box
            bg={cardBg}
            p={6}
            borderRadius='xl'
            border='1px'
            borderColor={cardBorder}>
            <VStack spacing={4} align='stretch'>
              <Heading size='md' color={textColor}>
                ✨ Features
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                <VStack align='start' spacing={2}>
                  <Badge colorScheme='blue'>Smart Type Detection</Badge>
                  <Text fontSize='sm' color={subTextColor}>
                    Automatically detects strings, numbers, booleans, dates, and
                    complex objects
                  </Text>
                </VStack>
                <VStack align='start' spacing={2}>
                  <Badge colorScheme='green'>Nested Objects</Badge>
                  <Text fontSize='sm' color={subTextColor}>
                    Handles deeply nested object structures with proper
                    interface generation
                  </Text>
                </VStack>
                <VStack align='start' spacing={2}>
                  <Badge colorScheme='purple'>Array Analysis</Badge>
                  <Text fontSize='sm' color={subTextColor}>
                    Analyzes array elements to determine proper array types and
                    union types
                  </Text>
                </VStack>
                <VStack align='start' spacing={2}>
                  <Badge colorScheme='orange'>Optional Fields</Badge>
                  <Text fontSize='sm' color={subTextColor}>
                    Marks fields as optional based on their presence across
                    multiple objects
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default TypeScriptInterfaceGeneratorPage;
