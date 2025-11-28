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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  useToast,
  Flex,
  Icon,
  Image,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Code,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Download,
  Copy,
  FileText,
  Image as ImageIcon,
  Layers,
  Zap,
} from "lucide-react";
import SEO from "../../../components/SEO";
import BackButton from "../../../components/BackButton";
import {
  encodeToBase64,
  decodeFromBase64,
  encodeToBase64Url,
  decodeFromBase64Url,
  processFile,
  decodeBase64ToFile,
  batchEncode,
  batchDecode,
  getBase64Info,
  formatSize,
  type Base64Result,
  type FileProcessResult,
  type BatchProcessResult,
  resizeImage,
} from "../../../utils/labs/base64-tool/base64Utils";

const Base64ToolPage = () => {
  const [input, setInput] = useState("Hello, World! 🌍");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [batchInput, setBatchInput] = useState("");
  const [fileResult, setFileResult] = useState<FileProcessResult | null>(null);
  const [batchResult, setBatchResult] = useState<BatchProcessResult | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [maxImageWidth, setMaxImageWidth] = useState<number | undefined>(
    undefined
  );
  const [maxImageHeight, setMaxImageHeight] = useState<number | undefined>(
    undefined
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const successBg = useColorModeValue("green.50", "green.900");
  const errorBg = useColorModeValue("red.50", "red.900");

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result: Base64Result;

    if (mode === "encode") {
      result = urlSafe ? encodeToBase64Url(input) : encodeToBase64(input);
    } else {
      result = urlSafe ? decodeFromBase64Url(input) : decodeFromBase64(input);
    }

    if (result.success && result.result) {
      setOutput(result.result);
    } else {
      setOutput(`Error: ${result.error}`);
    }
  }, [input, mode, urlSafe]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const result = await processFile(file);
      setFileResult(result);

      if (result.success && result.result) {
        setInput(result.result);
        setMode("decode");
        toast({
          title: "File processed successfully",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: "File processing failed",
          description: result.error,
          status: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "File processing failed",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchProcess = () => {
    const lines = batchInput.split("\n").filter((line) => line.trim());
    if (lines.length === 0) return;

    const result = mode === "encode" ? batchEncode(lines) : batchDecode(lines);
    setBatchResult(result);
  };

  const downloadFile = () => {
    if (!output) return;

    try {
      const fileName = prompt("Enter filename:", "decoded-file.txt");
      if (!fileName) return;

      const mimeType =
        prompt(
          "Enter MIME type (or leave empty for text/plain):",
          "text/plain"
        ) || "text/plain";
      decodeBase64ToFile(output, fileName, mimeType);

      toast({
        title: "File downloaded",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Unknown error",
        status: "error",
        duration: 5000,
      });
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];

      setIsProcessing(true);
      try {
        const result = await processFile(file);
        setFileResult(result);

        if (result.success && result.result) {
          setInput(result.result);
          setMode("decode");
          toast({
            title: "File processed successfully",
            status: "success",
            duration: 3000,
          });
        } else {
          toast({
            title: "File processing failed",
            description: result.error,
            status: "error",
            duration: 5000,
          });
        }
      } catch (error) {
        toast({
          title: "File processing failed",
          description: error instanceof Error ? error.message : "Unknown error",
          status: "error",
          duration: 5000,
        });
      } finally {
        setIsProcessing(false);
        setMaxImageWidth(undefined);
        setMaxImageHeight(undefined);
      }
    }
  };

  const base64Info = input ? getBase64Info(input) : null;

  return (
    <>
      <SEO
        title='Base64 Encoder/Decoder - File & Batch Processing Tool'
        description='Encode and decode Base64 strings with file upload support, batch processing, and URL-safe encoding options.'
        path='/labs/base64-tool'
      />

      <Box as='main' maxW='7xl' mx='auto' px={4} py={8}>
        <BackButton />
        <VStack spacing={8} align='stretch'>
          {/* Header */}
          <VStack spacing={4} textAlign='center'>
            <Heading as='h1' size='2xl' color={textColor}>
              <Icon as={Layers} display='inline' mr={2} />
              Base64 Encoder/Decoder
            </Heading>
            <Text fontSize='lg' color={subTextColor} maxW='2xl'>
              Encode and decode Base64 strings with support for files, batch
              processing, and URL-safe encoding. Perfect for developers working
              with data encoding.
            </Text>
          </VStack>

          <Tabs variant='enclosed' colorScheme='blue'>
            <TabList>
              <Tab>
                <Icon as={FileText} mr={2} />
                Text Processing
              </Tab>
              <Tab>
                <Icon as={Upload} mr={2} />
                File Upload
              </Tab>
              <Tab>
                <Icon as={Zap} mr={2} />
                Batch Processing
              </Tab>
              <Tab>
                <Icon as={ImageIcon} mr={2} />
                CSS Background
              </Tab>
            </TabList>

            <TabPanels>
              {/* Text Processing Tab */}
              <TabPanel>
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
                        <HStack justify='space-between'>
                          <Heading size='md' color={textColor}>
                            Input
                          </Heading>
                          <HStack>
                            <Select
                              value={mode}
                              onChange={(e) =>
                                setMode(e.target.value as "encode" | "decode")
                              }
                              size='sm'
                              w='auto'>
                              <option value='encode'>Encode</option>
                              <option value='decode'>Decode</option>
                            </Select>
                            <FormControl
                              display='flex'
                              alignItems='center'
                              w='auto'>
                              <FormLabel
                                htmlFor='url-safe'
                                mb='0'
                                fontSize='sm'>
                                URL-Safe
                              </FormLabel>
                              <Switch
                                id='url-safe'
                                isChecked={urlSafe}
                                onChange={(e) => setUrlSafe(e.target.checked)}
                              />
                            </FormControl>
                          </HStack>
                        </HStack>

                        <Textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={
                            mode === "encode"
                              ? "Enter text to encode..."
                              : "Enter Base64 to decode..."
                          }
                          rows={8}
                          fontFamily='mono'
                          fontSize='sm'
                        />

                        {base64Info && mode === "decode" && (
                          <Alert
                            status={base64Info.isValid ? "success" : "error"}
                            size='sm'>
                            <AlertIcon />
                            <VStack align='start' spacing={1} fontSize='sm'>
                              <Text>
                                {base64Info.isValid ? "Valid" : "Invalid"}{" "}
                                Base64 ({base64Info.type})
                              </Text>
                              {base64Info.isValid && (
                                <Text>
                                  Estimated decoded size:{" "}
                                  {formatSize(base64Info.estimatedSize)}
                                  {base64Info.mimeType &&
                                    ` • MIME: ${base64Info.mimeType}`}
                                </Text>
                              )}
                            </VStack>
                          </Alert>
                        )}

                        <Button
                          onClick={processText}
                          colorScheme='blue'
                          size='lg'>
                          {mode === "encode"
                            ? "Encode to Base64"
                            : "Decode from Base64"}
                        </Button>
                      </VStack>
                    </Box>
                  </VStack>

                  {/* Output Section */}
                  <VStack spacing={6} align='stretch'>
                    <Box
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='stretch'>
                        <HStack justify='space-between'>
                          <Heading size='md' color={textColor}>
                            Output
                          </Heading>
                          <HStack>
                            <Button
                              size='sm'
                              leftIcon={<Copy size={14} />}
                              onClick={() => copyToClipboard(output, "Output")}
                              isDisabled={!output}>
                              Copy
                            </Button>
                            {mode === "decode" &&
                              output &&
                              !output.startsWith("Error:") && (
                                <Button
                                  size='sm'
                                  leftIcon={<Download size={14} />}
                                  onClick={downloadFile}>
                                  Download
                                </Button>
                              )}
                          </HStack>
                        </HStack>

                        <Textarea
                          value={output}
                          isReadOnly
                          placeholder='Output will appear here...'
                          rows={8}
                          fontFamily='mono'
                          fontSize='sm'
                          bg={output.startsWith("Error:") ? errorBg : successBg}
                        />

                        {output && !output.startsWith("Error:") && (
                          <Text fontSize='sm' color={subTextColor}>
                            Output length: {output.length} characters
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </SimpleGrid>
              </TabPanel>

              {/* File Upload Tab */}
              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='stretch'>
                      <Heading size='md' color={textColor}>
                        File to Base64
                      </Heading>

                      <Box
                        border='2px dashed'
                        borderColor={isDragging ? "blue.400" : cardBorder}
                        borderRadius='lg'
                        p={8}
                        textAlign='center'
                        cursor='pointer'
                        bg={isDragging ? "blue.50" : "transparent"}
                        _hover={{ borderColor: "blue.400", bg: "blue.50" }}
                        _dark={{
                          _hover: { bg: "blue.900" },
                          bg: isDragging ? "blue.900" : "transparent",
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        <VStack spacing={3}>
                          {isProcessing ? (
                            <>
                              <Spinner size='xl' color='blue.500' />
                              <Text color={textColor}>Processing file...</Text>
                            </>
                          ) : (
                            <>
                              <Icon
                                as={Upload}
                                size='48'
                                color={isDragging ? "blue.500" : subTextColor}
                              />
                              <Text color={textColor}>
                                {isDragging
                                  ? "Drop file here"
                                  : "Click to upload file or drag and drop"}
                              </Text>
                              <Text fontSize='sm' color={subTextColor}>
                                Any file type supported • Max size: 10MB
                              </Text>
                            </>
                          )}
                        </VStack>
                      </Box>

                      <Input
                        ref={fileInputRef}
                        type='file'
                        onChange={handleFileUpload}
                        display='none'
                      />

                      {isProcessing && (
                        <Progress isIndeterminate colorScheme='blue' />
                      )}

                      {fileResult && (
                        <Box
                          p={4}
                          bg={fileResult.success ? successBg : errorBg}
                          borderRadius='md'>
                          <VStack align='start' spacing={2}>
                            <HStack>
                              <Icon
                                as={fileResult.isImage ? ImageIcon : FileText}
                              />
                              <Text fontWeight='semibold'>
                                {fileResult.fileName}
                              </Text>
                              <Badge
                                colorScheme={
                                  fileResult.success ? "green" : "red"
                                }>
                                {fileResult.success ? "Success" : "Failed"}
                              </Badge>
                            </HStack>
                            <Text fontSize='sm'>
                              Size: {formatSize(fileResult.fileSize)} • Type:{" "}
                              {fileResult.fileType}
                            </Text>
                            {fileResult.error && (
                              <Text fontSize='sm' color='red.600'>
                                Error: {fileResult.error}
                              </Text>
                            )}
                            {fileResult.isImage && fileResult.dataUrl && (
                              <Image
                                src={fileResult.dataUrl}
                                alt={fileResult.fileName}
                                maxH='200px'
                                borderRadius='md'
                              />
                            )}
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Batch Processing Tab */}
              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='stretch'>
                      <HStack justify='space-between'>
                        <Heading size='md' color={textColor}>
                          Batch Processing
                        </Heading>
                        <HStack>
                          <Select
                            value={mode}
                            onChange={(e) =>
                              setMode(e.target.value as "encode" | "decode")
                            }
                            size='sm'
                            w='auto'>
                            <option value='encode'>Batch Encode</option>
                            <option value='decode'>Batch Decode</option>
                          </Select>
                        </HStack>
                      </HStack>

                      <Text fontSize='sm' color={subTextColor}>
                        Enter one item per line to process multiple strings at
                        once:
                      </Text>

                      <Textarea
                        value={batchInput}
                        onChange={(e) => setBatchInput(e.target.value)}
                        placeholder={`Line 1\nLine 2\nLine 3\n...`}
                        rows={6}
                        fontFamily='mono'
                        fontSize='sm'
                      />

                      <Button onClick={handleBatchProcess} colorScheme='blue'>
                        Process{" "}
                        {
                          batchInput.split("\n").filter((line) => line.trim())
                            .length
                        }{" "}
                        Items
                      </Button>

                      {batchResult && (
                        <Box>
                          <HStack justify='space-between' mb={4}>
                            <Text fontWeight='semibold'>Results:</Text>
                            <HStack>
                              <Badge colorScheme='green'>
                                {batchResult.successfulItems} Success
                              </Badge>
                              <Badge colorScheme='red'>
                                {batchResult.failedItems} Failed
                              </Badge>
                              <Button
                                size='sm'
                                leftIcon={<Copy size={14} />}
                                onClick={() => {
                                  const successfulResults = batchResult.results
                                    .filter((r) => r.result.success)
                                    .map((r) => r.result.result)
                                    .join("\n");
                                  copyToClipboard(
                                    successfulResults,
                                    "Batch results"
                                  );
                                }}
                                isDisabled={batchResult.successfulItems === 0}>
                                Copy All
                              </Button>
                            </HStack>
                          </HStack>

                          <Accordion allowToggle>
                            <AccordionItem>
                              <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                  View Detailed Results
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                              <AccordionPanel pb={4}>
                                <VStack spacing={2} align='stretch'>
                                  {batchResult.results.map((item, index) => (
                                    <Box
                                      key={index}
                                      p={3}
                                      bg={
                                        item.result.success
                                          ? successBg
                                          : errorBg
                                      }
                                      borderRadius='md'>
                                      <Text
                                        fontSize='sm'
                                        fontWeight='semibold'
                                        mb={1}>
                                        Item {index + 1}:
                                      </Text>
                                      <Text
                                        fontSize='sm'
                                        fontFamily='mono'
                                        mb={1}>
                                        Input: {item.input}
                                      </Text>
                                      {item.result.success ? (
                                        <Text fontSize='sm' fontFamily='mono'>
                                          Output: {item.result.result}
                                        </Text>
                                      ) : (
                                        <Text fontSize='sm' color='red.600'>
                                          Error: {item.result.error}
                                        </Text>
                                      )}
                                    </Box>
                                  ))}
                                </VStack>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* CSS Background Generator Tab */}
              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='stretch'>
                      <Heading size='md' color={textColor}>
                        🎨 Image to CSS Background
                      </Heading>
                      <Text fontSize='sm' color={subTextColor}>
                        Upload an image to generate CSS background-image code
                        with base64 data URL
                      </Text>

                      <Box
                        border='2px dashed'
                        borderColor={isDragging ? "blue.400" : cardBorder}
                        borderRadius='lg'
                        p={8}
                        textAlign='center'
                        cursor='pointer'
                        bg={isDragging ? "blue.50" : "transparent"}
                        _hover={{ borderColor: "blue.400", bg: "blue.50" }}
                        _dark={{
                          _hover: { bg: "blue.900" },
                          bg: isDragging ? "blue.900" : "transparent",
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        <VStack spacing={3}>
                          {isProcessing ? (
                            <>
                              <Spinner size='xl' color='blue.500' />
                              <Text color={textColor}>Processing image...</Text>
                            </>
                          ) : (
                            <>
                              <Icon
                                as={Upload}
                                size='48'
                                color={isDragging ? "blue.500" : subTextColor}
                              />
                              <Text color={textColor}>
                                {isDragging
                                  ? "Release to upload"
                                  : "Images will be optimized for web use"}
                              </Text>
                            </>
                          )}
                        </VStack>
                      </Box>

                      {fileResult &&
                        fileResult.success &&
                        fileResult.isImage &&
                        fileResult.dataUrl && (
                          <VStack spacing={4} align='stretch'>
                            <Text fontWeight='semibold'>Preview:</Text>
                            <Box
                              h='200px'
                              borderRadius='md'
                              border='1px'
                              borderColor={cardBorder}
                              display='flex'
                              alignItems='center'
                              justifyContent='center'>
                              <Image
                                key={fileResult.dataUrl}
                                src={fileResult.dataUrl}
                                alt='Background preview'
                                objectFit='contain'
                                w='100%'
                                h='100%'
                                onLoad={() =>
                                  console.log("Image loaded successfully")
                                }
                                onError={() =>
                                  console.log("Image failed to load")
                                }
                              />
                            </Box>

                            <Text fontWeight='semibold'>
                              Resize Options (for copying):
                            </Text>
                            <HStack spacing={4}>
                              <FormControl
                                display='flex'
                                alignItems='center'
                                flex={1}>
                                <FormLabel
                                  htmlFor='max-width'
                                  mb='0'
                                  fontSize='sm'>
                                  Max Width (px):
                                </FormLabel>
                                <Input
                                  id='max-width'
                                  type='number'
                                  value={maxImageWidth || ""}
                                  onChange={(e) =>
                                    setMaxImageWidth(
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                    )
                                  }
                                  placeholder='e.g., 800'
                                  size='sm'
                                  width='100px'
                                />
                              </FormControl>
                              <FormControl
                                display='flex'
                                alignItems='center'
                                flex={1}>
                                <FormLabel
                                  htmlFor='max-height'
                                  mb='0'
                                  fontSize='sm'>
                                  Max Height (px):
                                </FormLabel>
                                <Input
                                  id='max-height'
                                  type='number'
                                  value={maxImageHeight || ""}
                                  onChange={(e) =>
                                    setMaxImageHeight(
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                    )
                                  }
                                  placeholder='e.g., 600'
                                  size='sm'
                                  width='100px'
                                />
                              </FormControl>
                            </HStack>

                            <Text fontWeight='semibold'>Generated CSS:</Text>
                            <Box
                              p={4}
                              bg={successBg}
                              borderRadius='md'
                              position='relative'>
                              <HStack>
                                <Button
                                  size='sm'
                                  leftIcon={<Copy size={12} />}
                                  onClick={() => {
                                    const cssCode = `.background-image {\n  background-image: url(${fileResult.dataUrl});\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}`;
                                    copyToClipboard(cssCode, "CSS code");
                                  }}>
                                  Copy CSS
                                </Button>
                                <Button
                                  size='sm'
                                  leftIcon={<Copy size={12} />}
                                  onClick={async () => {
                                    let urlToCopy = fileResult.dataUrl!;
                                    if (
                                      fileResult.dataUrl &&
                                      (maxImageWidth || maxImageHeight)
                                    ) {
                                      try {
                                        urlToCopy = await resizeImage(
                                          fileResult.dataUrl,
                                          maxImageWidth,
                                          maxImageHeight
                                        );
                                        toast({
                                          title: "Image resized for copying!",
                                          status: "info",
                                          duration: 2000,
                                        });
                                      } catch (error) {
                                        toast({
                                          title: "Failed to resize image",
                                          description:
                                            error instanceof Error
                                              ? error.message
                                              : "Unknown error",
                                          status: "error",
                                          duration: 3000,
                                        });
                                      }
                                    }
                                    copyToClipboard(
                                      urlToCopy,
                                      "Image data URL"
                                    );
                                  }}>
                                  Copy Image
                                </Button>
                              </HStack>
                              <Text
                                as='pre'
                                whiteSpace='pre-wrap'
                                fontSize='sm'
                                fontFamily='mono'>
                                {`.background-image {
  background-image: url(${fileResult.dataUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`}
                              </Text>
                            </Box>

                            <Alert status='info' size='sm'>
                              <AlertIcon />
                              <VStack align='start' spacing={1} fontSize='sm'>
                                <Text>
                                  File size: {formatSize(fileResult.fileSize)}
                                </Text>
                                <Text>
                                  Note: Large images will increase CSS file
                                  size. Consider optimizing images first.
                                </Text>
                              </VStack>
                            </Alert>
                          </VStack>
                        )}
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </>
  );
};

export default Base64ToolPage;
