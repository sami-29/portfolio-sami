/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
// TODO: This labs feature is under development and currently disabled
// Remove the eslint-disable comment above when ready to complete this feature
"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
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
  Flex,
  Icon,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Kbd,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCw,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Gamepad2,
  BookOpen,
  Trophy,
  Target,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Save,
  MoreHorizontal,
} from "lucide-react";
import SEO from "../../../components/SEO";
import BackButton from "../../../components/BackButton";
import {
  createInitialGameState,
  updateGameState,
  movePiece,
  rotatePieceInGame,
  hardDrop,
  holdPiece,
  togglePause,
  resetGame,
  getGhostPiece,
  getGameStats,
  getHighScores,
  saveHighScore,
  saveGameConfig,
  loadGameConfig,
  DEFAULT_CONFIG,
  drawBoard,
  drawPiece,
  drawNextPiece,
  drawVisualEffects,
  TETROMINO_SHAPES,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  CELL_SIZE,
  TETRIS_MECHANICS,
  playGameSound,
  clearGameEvents,
  GameEvent,
  VisualEffect,
  GameConfig,
  GameState,
  GameStats,
  HighScore,
  test7BagSystem,
  isPieceFloating,
} from "../../../utils/labs/tetris/tetrisUtils";

const TetrisPage = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>(() =>
    loadGameConfig()
  );
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(gameConfig)
  );
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [highScores, setHighScores] = useState<HighScore[]>(() =>
    getHighScores()
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextPieceCanvasRef = useRef<HTMLCanvasElement>(null);
  const holdPieceCanvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const lastMoveTime = useRef<{ [key: string]: number }>({});

  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure();
  const {
    isOpen: isScoresOpen,
    onOpen: onScoresOpen,
    onClose: onScoresClose,
  } = useDisclosure();

  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const successBg = useColorModeValue("green.50", "green.900");
  const warningBg = useColorModeValue("orange.50", "orange.900");

  // Game loop and logic
  useEffect(() => {
    if (!isPlaying || gameState.isGameOver || gameState.isPaused) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      return;
    }

    const gameLoop = () => {
      setGameState((prevState) => {
        const newState = updateGameState(prevState);

        // Process sound events
        if (newState.events.length > 0) {
          newState.events.forEach((event) => {
            playGameSound(event.type, gameConfig);
          });
        }

        // Handle game over
        if (newState.isGameOver && !prevState.isGameOver) {
          playGameSound("gameOver", gameConfig);
          setIsPlaying(false);
          const finalStats = getGameStats(newState, gameStartTime);
          const newHighScore: HighScore = {
            score: newState.score,
            lines: newState.lines,
            level: newState.level,
            date: new Date().toISOString(),
            duration: finalStats.gameTime * 60, // Convert minutes to seconds
          };
          saveHighScore(newHighScore);
          setHighScores(getHighScores());
        }

        // Clear events after processing
        return clearGameEvents(newState);
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    isPlaying,
    gameState.isGameOver,
    gameState.isPaused,
    gameConfig,
    gameStartTime,
  ]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const nextCanvas = nextPieceCanvasRef.current;
    const holdCanvas = holdPieceCanvasRef.current;

    if (!canvas || !nextCanvas || !holdCanvas) return;

    const ctx = canvas.getContext("2d");
    const nextCtx = nextCanvas.getContext("2d");
    const holdCtx = holdCanvas.getContext("2d");

    if (!ctx || !nextCtx || !holdCtx) return;

    // Clear canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    holdCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);

    drawBoard(
      ctx,
      gameState,
      CELL_SIZE,
      gameConfig.boardBrightness,
      TETROMINO_SHAPES
    );

    // Draw ghost piece (preview)
    const ghostPiece = getGhostPiece(gameState);
    if (ghostPiece) {
      drawPiece(ctx, ghostPiece, CELL_SIZE, 0.3);
    }

    // Draw current piece with blinking effect during lock delay
    if (gameState.currentPiece) {
      const blink =
        gameState.lockTimer > 0 &&
        gameState.lockTimer < gameState.lockDelay &&
        Math.floor(Date.now() / 100) % 2 === 0;
      drawPiece(ctx, gameState.currentPiece, CELL_SIZE, blink ? 0.5 : 1);
    }

    // Draw visual effects (line clears, level ups, etc.)
    if (gameConfig.visualEffects && gameState.visualEffects.length > 0) {
      drawVisualEffects(ctx, gameState.visualEffects, CELL_SIZE);
    }

    // Draw next pieces
    gameState.nextPieces
      .slice(0, gameConfig.showNextPieces)
      .forEach((piece, index) => {
        const smallCellSize = CELL_SIZE * 0.6;
        const offsetY = index * (smallCellSize * 3 + 10);
        drawNextPiece(nextCtx, piece, smallCellSize, 10, 10 + offsetY);
      });

    // Draw hold piece
    if (gameState.holdPiece) {
      const smallCellSize = CELL_SIZE * 0.7;
      drawNextPiece(holdCtx, gameState.holdPiece, smallCellSize, 10, 10);
    }
  }, [gameState, gameConfig.boardBrightness, gameConfig.showNextPieces]);

  // Keyboard controls with proper DAS/ARR
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPlaying || gameState.isGameOver) return;

      const key = event.key.toLowerCase();

      // Prevent page scrolling when pressing down
      if (
        ["arrowdown", "arrowup", "arrowleft", "arrowright", " "].includes(key)
      ) {
        event.preventDefault();
      }

      // Don't repeat if already pressed (except for movement keys)
      if (
        keysPressed.current.has(key) &&
        !["arrowleft", "arrowright", "arrowdown", "s"].includes(key)
      ) {
        return;
      }

      keysPressed.current.add(key);
      const now = Date.now();

      switch (key) {
        case "a":
        case "arrowleft":
          if (
            !lastMoveTime.current[key] ||
            now - lastMoveTime.current[key] > gameConfig.autoRepeatDelay
          ) {
            setGameState((prev) => movePiece(prev, "left"));
            lastMoveTime.current[key] = now;
          }
          break;
        case "d":
        case "arrowright":
          if (
            !lastMoveTime.current[key] ||
            now - lastMoveTime.current[key] > gameConfig.autoRepeatDelay
          ) {
            setGameState((prev) => movePiece(prev, "right"));
            lastMoveTime.current[key] = now;
          }
          break;
        case "s":
        case "arrowdown":
          setGameState((prev) => movePiece(prev, "down"));
          break;
        case "w":
        case "arrowup":
        case " ":
          setGameState((prev) => rotatePieceInGame(prev, true));
          break;
        case "q":
          if (gameConfig.hardDropEnabled) {
            setGameState((prev) => hardDrop(prev));
          }
          break;
        case "e":
          setGameState((prev) => rotatePieceInGame(prev, false));
          break;
        case "c":
        case "shift":
          if (gameConfig.holdEnabled) {
            setGameState((prev) => holdPiece(prev));
          }
          break;
        case "p":
        case "escape":
          setGameState((prev) => togglePause(prev));
          break;
        case "r":
          if (event.ctrlKey) {
            restartGame();
          }
          break;
        case "f11":
          toggleFullscreen();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keysPressed.current.delete(key);
      delete lastMoveTime.current[key];
    };

    // Auto-repeat for movement keys
    const autoRepeat = setInterval(() => {
      if (!isPlaying || gameState.isGameOver) return;

      const now = Date.now();
      const keysArray = Array.from(keysPressed.current);
      for (const key of keysArray) {
        if (
          ["arrowleft", "a"].includes(key) &&
          lastMoveTime.current[key] &&
          now - lastMoveTime.current[key] > gameConfig.autoRepeatRate
        ) {
          setGameState((prev) => movePiece(prev, "left"));
          lastMoveTime.current[key] = now;
        }
        if (
          ["arrowright", "d"].includes(key) &&
          lastMoveTime.current[key] &&
          now - lastMoveTime.current[key] > gameConfig.autoRepeatRate
        ) {
          setGameState((prev) => movePiece(prev, "right"));
          lastMoveTime.current[key] = now;
        }
      }
    }, 16); // ~60fps

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(autoRepeat);
    };
  }, [
    isPlaying,
    gameState.isGameOver,
    gameConfig.autoRepeatDelay,
    gameConfig.autoRepeatRate,
    gameConfig.hardDropEnabled,
    gameConfig.holdEnabled,
  ]);

  // Update game stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setGameStats(getGameStats(gameState, gameStartTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, gameStartTime, isPlaying]);

  // Fullscreen handling
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (gameBoardRef.current?.requestFullscreen) {
          await gameBoardRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const startGame = () => {
    const newGameState = createInitialGameState(gameConfig);
    setGameState(newGameState);
    setGameStartTime(Date.now());
    setIsPlaying(true);
    setGameStats(null);
  };

  const pauseGame = () => {
    setGameState((prev) => togglePause(prev));
  };

  const restartGame = () => {
    const newGameState = resetGame(gameConfig);
    setGameState(newGameState);
    setGameStartTime(Date.now());
    setIsPlaying(true);
    setGameStats(null);
  };

  const saveConfig = () => {
    saveGameConfig(gameConfig);
    // Update current game state with new config
    setGameState((prev) => ({ ...prev, config: gameConfig }));
    onConfigClose();
  };

  const resetConfig = () => {
    setGameConfig(DEFAULT_CONFIG);
  };

  return (
    <>
      <SEO
        title='Tetris Game - Interactive Canvas Implementation'
        description='Play a fully functional Tetris game built with Canvas and TypeScript. Learn about game mechanics, scoring systems, and implementation details.'
        path='/labs/tetris'
      />

      <Box as='main' maxW='7xl' mx='auto' px={4} py={8} ref={containerRef}>
        <BackButton />

        <VStack spacing={8} align='stretch'>
          {/* Header */}
          <VStack spacing={4} textAlign='center'>
            <Heading as='h1' size='2xl' color={textColor}>
              <Icon as={Gamepad2} display='inline' mr={2} />
              Official Tetris Game
            </Heading>
            <Text fontSize='lg' color={subTextColor} maxW='2xl'>
              Professional Tetris implementation following official Tetris
              Guidelines. Features 7-bag randomizer, SRS rotation, lock delay,
              and all modern mechanics.
            </Text>
          </VStack>

          <Tabs variant='enclosed' colorScheme='blue'>
            <TabList>
              <Tab>
                <Icon as={Gamepad2} mr={2} />
                Play Game
              </Tab>
              <Tab>
                <Icon as={BookOpen} mr={2} />
                Game Mechanics
              </Tab>
              <Tab>
                <Icon as={Target} mr={2} />
                Strategy Guide
              </Tab>
              <Tab>
                <Icon as={Trophy} mr={2} />
                Implementation
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex justify='center' w='full' px={4}>
                  <Box maxW='6xl' w='full'>
                    <VStack
                      ref={gameBoardRef}
                      spacing={6}
                      align='stretch'
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}
                      bg={cardBg}
                      w='full'>
                      <HStack justify='space-between' w='full' flexWrap='wrap'>
                        <Heading size='md' color={textColor}>
                          Game Board
                        </Heading>
                        <HStack spacing={2} flexWrap='wrap'>
                          <IconButton
                            aria-label='Settings'
                            icon={<Settings size={16} />}
                            size='sm'
                            onClick={onConfigOpen}
                          />
                          <IconButton
                            aria-label='High Scores'
                            icon={<Trophy size={16} />}
                            size='sm'
                            onClick={onScoresOpen}
                          />
                          <IconButton
                            aria-label='Fullscreen'
                            icon={
                              isFullscreen ? (
                                <Minimize size={16} />
                              ) : (
                                <Maximize size={16} />
                              )
                            }
                            size='sm'
                            onClick={toggleFullscreen}
                          />
                          {!isPlaying ? (
                            <Button
                              onClick={startGame}
                              colorScheme='green'
                              leftIcon={<Play size={16} />}>
                              Start Game
                            </Button>
                          ) : (
                            <>
                              <Button
                                onClick={pauseGame}
                                colorScheme='blue'
                                size='sm'
                                leftIcon={
                                  gameState.isPaused ? (
                                    <Play size={16} />
                                  ) : (
                                    <Pause size={16} />
                                  )
                                }>
                                {gameState.isPaused ? "Resume" : "Pause"}
                              </Button>
                              <Button
                                onClick={restartGame}
                                colorScheme='red'
                                size='sm'
                                leftIcon={<RefreshCw size={16} />}>
                                Restart
                              </Button>
                            </>
                          )}
                        </HStack>
                      </HStack>

                      {/* Main Game Section: Hold, Canvas, Next */}
                      <HStack
                        spacing={6}
                        w='full'
                        align='flex-start'
                        justify='center'
                        flexWrap={{ base: "wrap", md: "nowrap" }}>
                        {/* Hold Piece */}
                        {gameConfig.holdEnabled && (
                          <VStack spacing={2}>
                            <Text
                              fontWeight='semibold'
                              fontSize='sm'
                              color={textColor}>
                              Hold
                            </Text>
                            <Box
                              position='relative'
                              border='2px solid'
                              borderColor={
                                gameState.holdPiece ? "blue.400" : cardBorder
                              }
                              borderRadius='lg'
                              bg={useColorModeValue("gray.50", "gray.800")}
                              p={3}
                              boxShadow='md'
                              transition='all 0.2s'
                              _hover={{ borderColor: "blue.300" }}>
                              <canvas
                                ref={holdPieceCanvasRef}
                                width={100}
                                height={80}
                                style={{ display: "block" }}
                              />
                              {!gameState.holdPiece && (
                                <Box
                                  position='absolute'
                                  top='50%'
                                  left='50%'
                                  transform='translate(-50%, -50%)'
                                  color={subTextColor}
                                  fontSize='xs'
                                  textAlign='center'>
                                  Press C<br />
                                  to hold
                                </Box>
                              )}
                            </Box>
                          </VStack>
                        )}

                        {/* Main Game Canvas */}
                        <VStack spacing={4} flex='0 0 auto'>
                          <Box position='relative'>
                            <canvas
                              ref={canvasRef}
                              width={BOARD_WIDTH * CELL_SIZE}
                              height={BOARD_HEIGHT * CELL_SIZE}
                              style={{
                                border: "2px solid #333",
                                borderRadius: "8px",
                                background: "#000",
                              }}
                            />

                            {gameState.isPaused && (
                              <Box
                                position='absolute'
                                top='50%'
                                left='50%'
                                transform='translate(-50%, -50%)'
                                bg='blackAlpha.800'
                                color='white'
                                px={4}
                                py={2}
                                borderRadius='md'
                                fontSize='lg'
                                fontWeight='bold'>
                                PAUSED
                              </Box>
                            )}

                            {gameState.isGameOver && (
                              <Box
                                position='absolute'
                                top='50%'
                                left='50%'
                                transform='translate(-50%, -50%)'
                                bg='blackAlpha.900'
                                color='white'
                                px={6}
                                py={4}
                                borderRadius='md'
                                textAlign='center'>
                                <Text fontSize='xl' fontWeight='bold' mb={2}>
                                  GAME OVER
                                </Text>
                                <Text fontSize='md'>
                                  Score: {gameState.score.toLocaleString()}
                                </Text>
                                <Text fontSize='md'>
                                  Lines: {gameState.lines}
                                </Text>
                                <Text fontSize='md'>
                                  Level: {gameState.level}
                                </Text>
                              </Box>
                            )}
                          </Box>

                          {/* Integrated Game Stats */}
                          <VStack spacing={2} w='full'>
                            <HStack justify='space-around' w='full' pt={4}>
                              <VStack spacing={0}>
                                <Text fontSize='xs' color={subTextColor}>
                                  Score
                                </Text>
                                <Text fontSize='lg' fontWeight='bold'>
                                  {gameState.score.toLocaleString()}
                                </Text>
                              </VStack>
                              <VStack spacing={0}>
                                <Text fontSize='xs' color={subTextColor}>
                                  Level
                                </Text>
                                <Text fontSize='lg' fontWeight='bold'>
                                  {gameState.level}
                                </Text>
                              </VStack>
                              <VStack spacing={0}>
                                <Text fontSize='xs' color={subTextColor}>
                                  Lines
                                </Text>
                                <Text fontSize='lg' fontWeight='bold'>
                                  {gameState.lines}
                                </Text>
                              </VStack>
                            </HStack>
                            <Progress
                              value={(gameState.lines % 10) * 10}
                              w='full'
                              colorScheme='blue'
                              size='sm'
                            />
                            <Text fontSize='xs' color={subTextColor}>
                              Next level: {10 - (gameState.lines % 10)} lines
                            </Text>
                          </VStack>
                        </VStack>

                        {/* Next Pieces */}
                        <VStack spacing={2}>
                          <Text
                            fontWeight='semibold'
                            fontSize='sm'
                            color={textColor}>
                            Next
                          </Text>
                          <Box
                            border='2px solid'
                            borderColor='green.400'
                            borderRadius='lg'
                            bg={useColorModeValue("gray.50", "gray.800")}
                            p={3}
                            boxShadow='md'
                            transition='all 0.2s'>
                            <canvas
                              ref={nextPieceCanvasRef}
                              width={120}
                              height={Math.max(
                                200,
                                gameConfig.showNextPieces * 60
                              )}
                              style={{ display: "block" }}
                            />
                          </Box>
                        </VStack>
                      </HStack>

                      {/* Controls */}
                      <Box w='full'>
                        <Text
                          fontWeight='semibold'
                          mb={2}
                          color={textColor}
                          fontSize='sm'>
                          Controls:
                        </Text>
                        <SimpleGrid columns={3} spacing={1} fontSize='xs'>
                          <HStack>
                            <Kbd>←→</Kbd>
                            <Text>Move</Text>
                          </HStack>
                          <HStack>
                            <Kbd>↓</Kbd>
                            <Text>Soft Drop</Text>
                          </HStack>
                          <HStack>
                            <Kbd>↑/Space</Kbd>
                            <Text>Rotate</Text>
                          </HStack>
                          <HStack>
                            <Kbd>Q</Kbd>
                            <Text>Hard Drop</Text>
                          </HStack>
                          <HStack>
                            <Kbd>C</Kbd>
                            <Text>Hold</Text>
                          </HStack>
                          <HStack>
                            <Kbd>P/Esc</Kbd>
                            <Text>Pause</Text>
                          </HStack>
                        </SimpleGrid>
                      </Box>

                      {/* Mobile Controls */}
                      <SimpleGrid
                        columns={4}
                        spacing={2}
                        w='full'
                        display={{ base: "grid", md: "none" }}>
                        <Button
                          onClick={() =>
                            setGameState((prev) => movePiece(prev, "left"))
                          }
                          isDisabled={!isPlaying || gameState.isGameOver}
                          size='sm'>
                          ←
                        </Button>
                        <Button
                          onClick={() =>
                            setGameState((prev) =>
                              rotatePieceInGame(prev, true)
                            )
                          }
                          isDisabled={!isPlaying || gameState.isGameOver}
                          size='sm'>
                          ↻
                        </Button>
                        <Button
                          onClick={() =>
                            setGameState((prev) => movePiece(prev, "right"))
                          }
                          isDisabled={!isPlaying || gameState.isGameOver}
                          size='sm'>
                          →
                        </Button>
                        <Button
                          onClick={() => setGameState((prev) => hardDrop(prev))}
                          isDisabled={!isPlaying || gameState.isGameOver}
                          size='sm'>
                          ↓↓
                        </Button>
                      </SimpleGrid>
                    </VStack>

                    {/* Removed separate Game Info and Current Level Info boxes */}
                    {/* The space here will be automatically taken by other elements or removed */}
                    <VStack
                      spacing={6}
                      align='stretch'
                      display={{ base: "none", lg: "flex" }}>
                      {gameStats && (
                        <Box
                          bg={cardBg}
                          p={6}
                          borderRadius='xl'
                          border='1px'
                          borderColor={cardBorder}>
                          <VStack spacing={4}>
                            <Heading size='md' color={textColor}>
                              Overall Stats
                            </Heading>
                            <VStack
                              spacing={1}
                              w='full'
                              fontSize='xs'
                              color={subTextColor}>
                              <Text>
                                Time: {gameStats.gameTime.toFixed(1)} min
                              </Text>
                              <Text>
                                LPM: {gameStats.linesPerMinute.toFixed(1)}
                              </Text>
                              <Text>
                                SPM: {gameStats.scorePerMinute.toFixed(0)}
                              </Text>
                            </VStack>
                          </VStack>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                </Flex>
              </TabPanel>

              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  {Object.entries(TETRIS_MECHANICS).map(([key, mechanic]) => (
                    <Box
                      key={key}
                      bg={cardBg}
                      p={6}
                      borderRadius='xl'
                      border='1px'
                      borderColor={cardBorder}>
                      <VStack spacing={4} align='start'>
                        <Heading size='md' color={textColor}>
                          {mechanic.title}
                        </Heading>
                        <Text color={subTextColor}>{mechanic.description}</Text>
                        <VStack spacing={2} align='start'>
                          {mechanic.details.map((detail, index) => (
                            <Text key={index} fontSize='sm'>
                              • {detail}
                            </Text>
                          ))}
                        </VStack>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>

              {/* Strategy Guide Tab */}
              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='start'>
                      <Heading size='md' color={textColor}>
                        🎯 Tetromino Pieces Reference
                      </Heading>

                      <TableContainer w='full'>
                        <Table size='sm'>
                          <Thead>
                            <Tr>
                              <Th>Piece</Th>
                              <Th>Name</Th>
                              <Th>Color</Th>
                              <Th>Best Use</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {Object.entries(TETROMINO_SHAPES).map(
                              ([key, shape]) => (
                                <Tr key={key}>
                                  <Td fontWeight='bold' fontSize='lg'>
                                    {key}
                                  </Td>
                                  <Td>{shape.name}</Td>
                                  <Td>
                                    <Box
                                      w={4}
                                      h={4}
                                      bg={shape.color}
                                      borderRadius='sm'
                                      display='inline-block'
                                    />
                                  </Td>
                                  <Td fontSize='sm'>
                                    {key === "I" && "Tetris (4-line clears)"}
                                    {key === "O" && "Filling corners"}
                                    {key === "T" && "T-spins &amp; versatility"}
                                    {key === "S" && "Complex patterns"}
                                    {key === "Z" && "Complex patterns"}
                                    {key === "J" && "Foundation building"}
                                    {key === "L" && "Foundation building"}
                                  </Td>
                                </Tr>
                              )
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </VStack>
                  </Box>

                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='start'>
                      <Heading size='md' color={textColor}>
                        📈 Advanced Strategies
                      </Heading>

                      <Accordion allowToggle w='full'>
                        <AccordionItem>
                          <AccordionButton>
                            <Box
                              flex='1'
                              textAlign='left'
                              fontWeight='semibold'>
                              Tetris Setup Strategy
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack spacing={2} align='start'>
                              <Text>
                                • Keep the rightmost column clear for I-pieces
                              </Text>
                              <Text>
                                • Build up 3-4 rows on the left 9 columns
                              </Text>
                              <Text>
                                • Wait for I-piece to clear 4 lines (Tetris)
                              </Text>
                              <Text>
                                • This gives maximum points: 1200 × (level + 1)
                              </Text>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionButton>
                            <Box
                              flex='1'
                              textAlign='left'
                              fontWeight='semibold'>
                              7-Bag System Knowledge
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack spacing={2} align='start'>
                              <Text>
                                • All 7 pieces appear exactly once per bag
                              </Text>
                              <Text>
                                • Maximum drought for any piece: 12 pieces
                              </Text>
                              <Text>• Use this knowledge to plan ahead</Text>
                              <Text>
                                • If you haven&apos;t seen I in 6 pieces,
                                it&apos;s coming soon
                              </Text>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionButton>
                            <Box
                              flex='1'
                              textAlign='left'
                              fontWeight='semibold'>
                              Speed Management
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack spacing={2} align='start'>
                              <Text>• Use soft drop (↓) to control timing</Text>
                              <Text>• Hard drop (Q) for instant placement</Text>
                              <Text>
                                • Plan moves while current piece falls
                              </Text>
                              <Text>
                                • Use lock delay to your advantage (500ms)
                              </Text>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Implementation Tab */}
              <TabPanel>
                <VStack spacing={6} align='stretch' maxW='4xl' mx='auto'>
                  <Box
                    bg={cardBg}
                    p={6}
                    borderRadius='xl'
                    border='1px'
                    borderColor={cardBorder}>
                    <VStack spacing={4} align='start'>
                      <Heading size='md' color={textColor}>
                        🔧 Official Tetris Guidelines Implementation
                      </Heading>

                      <Text color={subTextColor}>
                        This implementation follows the official Tetris
                        Guidelines with complete accuracy:
                      </Text>

                      <VStack spacing={4} align='start' w='full'>
                        <Box>
                          <Text fontWeight='semibold' mb={2}>
                            7-Bag Randomizer:
                          </Text>
                          <VStack
                            spacing={1}
                            align='start'
                            fontSize='sm'
                            pl={4}>
                            <Text>• Shuffled bag of all 7 pieces</Text>
                            <Text>• Prevents long droughts and floods</Text>
                            <Text>• Maximum 12 pieces between same type</Text>
                            <Text>• More predictable than pure random</Text>
                          </VStack>
                        </Box>

                        <Box>
                          <Text fontWeight='semibold' mb={2}>
                            Lock Delay System:
                          </Text>
                          <VStack
                            spacing={1}
                            align='start'
                            fontSize='sm'
                            pl={4}>
                            <Text>• 500ms delay before piece locks</Text>
                            <Text>• Resets when piece moves or rotates</Text>
                            <Text>• Allows for advanced maneuvers</Text>
                            <Text>• Prevents accidental misdrops</Text>
                          </VStack>
                        </Box>

                        <Box>
                          <Text fontWeight='semibold' mb={2}>
                            Super Rotation System (SRS):
                          </Text>
                          <VStack
                            spacing={1}
                            align='start'
                            fontSize='sm'
                            pl={4}>
                            <Text>• Wall kick system for failed rotations</Text>
                            <Text>• Multiple kick tests per rotation</Text>
                            <Text>• Different rules for I-piece</Text>
                            <Text>
                              • Enables advanced techniques like T-spins
                            </Text>
                          </VStack>
                        </Box>

                        <Box>
                          <Text fontWeight='semibold' mb={2}>
                            Modern Features:
                          </Text>
                          <VStack
                            spacing={1}
                            align='start'
                            fontSize='sm'
                            pl={4}>
                            <Text>• Ghost piece preview</Text>
                            <Text>• Hold function with swap limitation</Text>
                            <Text>• Multiple next piece preview</Text>
                            <Text>• Configurable DAS/ARR settings</Text>
                          </VStack>
                        </Box>
                      </VStack>
                    </VStack>
                  </Box>

                  <Alert status='info'>
                    <AlertIcon />
                    <VStack spacing={2} align='start' fontSize='sm'>
                      <Text fontWeight='semibold'>
                        Professional Implementation:
                      </Text>
                      <Text>
                        This Tetris game implements every major feature from the
                        official Tetris Guidelines, making it suitable for
                        competitive play and skill development. All timings,
                        mechanics, and behaviors match professional Tetris
                        games.
                      </Text>
                    </VStack>
                  </Alert>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>

        {/* Configuration Modal */}
        <Modal isOpen={isConfigOpen} onClose={onConfigClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Configuration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={6}>
                <SimpleGrid columns={2} spacing={4} w='full'>
                  <FormControl>
                    <FormLabel fontSize='sm'>Lock Delay (ms)</FormLabel>
                    <NumberInput
                      value={gameConfig.lockDelay}
                      onChange={(_, num) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          lockDelay: num || 500,
                        }))
                      }
                      min={100}
                      max={1000}
                      step={50}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize='sm'>Next Pieces</FormLabel>
                    <Select
                      value={gameConfig.showNextPieces}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          showNextPieces: parseInt(e.target.value),
                        }))
                      }>
                      <option value={1}>1</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize='sm'>Auto Repeat Delay (ms)</FormLabel>
                    <NumberInput
                      value={gameConfig.autoRepeatDelay}
                      onChange={(_, num) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          autoRepeatDelay: num || 100,
                        }))
                      }
                      min={50}
                      max={300}
                      step={10}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize='sm'>Auto Repeat Rate (ms)</FormLabel>
                    <NumberInput
                      value={gameConfig.autoRepeatRate}
                      onChange={(_, num) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          autoRepeatRate: num || 50,
                        }))
                      }
                      min={10}
                      max={100}
                      step={5}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontSize='sm'>Board Brightness</FormLabel>
                  <Slider
                    value={gameConfig.boardBrightness}
                    onChange={(value) =>
                      setGameConfig((prev) => ({
                        ...prev,
                        boardBrightness: value,
                      }))
                    }
                    min={0.3}
                    max={1.0}
                    step={0.1}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>

                <SimpleGrid columns={2} spacing={4} w='full'>
                  <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='ghost-piece' mb='0' fontSize='sm'>
                      Ghost Piece
                    </FormLabel>
                    <Switch
                      id='ghost-piece'
                      isChecked={gameConfig.ghostPieceEnabled}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          ghostPieceEnabled: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='hold-enabled' mb='0' fontSize='sm'>
                      Hold Function
                    </FormLabel>
                    <Switch
                      id='hold-enabled'
                      isChecked={gameConfig.holdEnabled}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          holdEnabled: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='hard-drop' mb='0' fontSize='sm'>
                      Hard Drop
                    </FormLabel>
                    <Switch
                      id='hard-drop'
                      isChecked={gameConfig.hardDropEnabled}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          hardDropEnabled: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='sounds' mb='0' fontSize='sm'>
                      Sound Effects
                    </FormLabel>
                    <Switch
                      id='sounds'
                      isChecked={gameConfig.enableSounds}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          enableSounds: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>

                  <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='visual-effects' mb='0' fontSize='sm'>
                      Visual Effects
                    </FormLabel>
                    <Switch
                      id='visual-effects'
                      isChecked={gameConfig.visualEffects}
                      onChange={(e) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          visualEffects: e.target.checked,
                        }))
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                {gameConfig.enableSounds && (
                  <FormControl>
                    <FormLabel fontSize='sm'>Sound Volume</FormLabel>
                    <Slider
                      value={gameConfig.soundVolume}
                      onChange={(value) =>
                        setGameConfig((prev) => ({
                          ...prev,
                          soundVolume: value,
                        }))
                      }
                      min={0.0}
                      max={1.0}
                      step={0.1}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                )}

                {/* Debug Section */}
                <VStack
                  spacing={3}
                  w='full'
                  pt={4}
                  borderTop='1px'
                  borderColor={cardBorder}>
                  <Text fontSize='sm' fontWeight='semibold' color={textColor}>
                    🛠️ Debug Tools
                  </Text>

                  <HStack spacing={3} w='full'>
                    <Button
                      size='sm'
                      colorScheme='purple'
                      onClick={() => test7BagSystem(3)}
                      flex={1}>
                      Test 7-Bag System
                    </Button>

                    <Button
                      size='sm'
                      colorScheme='orange'
                      onClick={() => {
                        console.clear();
                        console.log("🎮 Current Game State:");
                        console.log("Events:", gameState.events);
                        console.log("Visual Effects:", gameState.visualEffects);
                        console.log("Current Bag:", gameState.pieceBag);
                        console.log("Next Bag:", gameState.nextBag);
                        if (gameState.currentPiece) {
                          console.log(
                            "Is Current Piece Floating:",
                            isPieceFloating(
                              gameState.board,
                              gameState.currentPiece
                            )
                          );
                        }
                      }}
                      flex={1}>
                      Log Game State
                    </Button>
                  </HStack>

                  <HStack spacing={3} w='full'>
                    <Button
                      size='sm'
                      colorScheme='red'
                      onClick={() => {
                        if (gameState.currentPiece) {
                          const isFloating = isPieceFloating(
                            gameState.board,
                            gameState.currentPiece
                          );
                          console.log("🔍 Floating Piece Check:", isFloating);
                          if (isFloating) {
                            console.warn("❌ FLOATING PIECE DETECTED!");
                            console.log(
                              "Piece Position:",
                              gameState.currentPiece.position
                            );
                            console.log(
                              "Piece Type:",
                              gameState.currentPiece.type
                            );
                          } else {
                            console.log("✅ Piece is properly supported");
                          }
                        } else {
                          console.log("No current piece to check");
                        }
                      }}
                      flex={1}>
                      Check Floating
                    </Button>

                    <Button
                      size='sm'
                      colorScheme='teal'
                      onClick={() => {
                        console.clear();
                        console.log("🗃️ Board State Analysis:");
                        for (let y = 20; y < 40; y++) {
                          // Show visible area
                          const row = gameState.board[y];
                          const rowStr = row
                            .map((cell) => (cell === 0 ? "·" : cell))
                            .join("");
                          console.log(`Row ${y - 20}: ${rowStr}`);
                        }
                      }}
                      flex={1}>
                      Show Board
                    </Button>
                  </HStack>

                  <Text fontSize='xs' color={subTextColor} textAlign='center'>
                    Check browser console for debug output
                  </Text>
                </VStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={resetConfig}>
                Reset
              </Button>
              <Button colorScheme='blue' onClick={saveConfig}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* High Scores Modal */}
        <Modal isOpen={isScoresOpen} onClose={onScoresClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>High Scores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {highScores.length === 0 ? (
                <Text textAlign='center' color={subTextColor}>
                  No high scores yet. Play a game to set your first score!
                </Text>
              ) : (
                <TableContainer>
                  <Table size='sm'>
                    <Thead>
                      <Tr>
                        <Th>Rank</Th>
                        <Th>Score</Th>
                        <Th>Lines</Th>
                        <Th>Level</Th>
                        <Th>Time</Th>
                        <Th>Date</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {highScores.map((score, index) => (
                        <Tr key={index}>
                          <Td fontWeight='bold'>#{index + 1}</Td>
                          <Td>{score.score.toLocaleString()}</Td>
                          <Td>{score.lines}</Td>
                          <Td>{score.level}</Td>
                          <Td>{((score.duration || 0) / 60).toFixed(1)}m</Td>
                          <Td>{new Date(score.date).toLocaleDateString()}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onScoresClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default TetrisPage;
