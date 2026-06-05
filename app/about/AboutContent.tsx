"use client";

import { Box, VStack, Heading, Text, SimpleGrid, Flex, Separator } from "@chakra-ui/react";
import { motion } from "motion/react";
import AboutCard from "../../components/AboutCard";
import { primaryStack, otherTools } from "./aboutData";
import { BIRTH_DATE } from "../../utils/constants";
import { getAge } from "../../utils/formatters";
import { easing, stagger } from "../../utils/motion";

const cardContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: stagger.fast, delayChildren: 0.05 },
  },
  viewport: { once: true, margin: "-60px" },
};

const cardItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easing.outQuart },
};

export default function AboutContent() {
  const age = getAge(BIRTH_DATE);

  return (
    <Box as="main" id="main-content" mb={16}>
      {/* ── Header ── */}
      <VStack gap={6} align="start" w={["90%", "75%", "60%"]} mx="auto" mt={{ base: 10, md: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart }}>
          <Text
            fontSize="sm"
            fontWeight="700"
            color="brand.400"
            letterSpacing="widest"
            textTransform="uppercase"
            fontFamily="heading">
            About
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easing.outQuart, delay: 0.1 }}>
          <Heading
            as="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            color="gray.100"
            lineHeight="1.05"
            letterSpacing="-0.03em"
            fontFamily="heading"
            fontWeight="700">
            Sami Bentaleb
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.2 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            I&apos;m Sami, {age}, from Algeria. I got my computer science bachelor&apos;s from Badji
            Mokhtar University and have been building web stuff since around 2020.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.3 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            I work full-stack with React, TypeScript, and Next.js. The projects I enjoy most are the
            ones where the UI has to do actual work. Not a brochure site. A dashboard someone opens
            every morning, or a workflow with enough edge cases that you stop trusting the happy
            path.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.4 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            I do more frontend than backend day to day, but I still want the database shape sorted
            early. Bad schema decisions always show up in the UI eventually, usually right before a
            deadline.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.5 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            Things I&apos;ve shipped: 2SCL, a smart city platform. SmartSIG, pharmacy sig
            management. MARE, maritime risk visualization on a map. Plus client websites and smaller
            apps that needed to go live without turning into a six-month saga.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.6 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            Off the clock I&apos;m usually in MTGA or Hearthstone. I played both competitively for a
            while. League of Legends too, peaked Diamond. Age of Empires when I want something
            slower and don&apos;t feel like queueing.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing.outQuart, delay: 0.7 }}>
          <Text
            fontSize={["lg", "xl"]}
            color="gray.400"
            lineHeight="1.75"
            maxW="2xl"
            fontFamily="body">
            I like building things people can use, and I like games where you have to read the
            system. Probably why both stuck. If you want to talk work, send an email or find me on
            LinkedIn.
          </Text>
        </motion.div>
      </VStack>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <Separator my={12} w={["90%", "75%", "80%"]} mx="auto" borderColor="gray.800" />
      </motion.div>

      {/* ── Primary Stack ── */}
      <VStack gap={4} align="start" w={["90%", "75%", "80%"]} mx="auto" mb={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: easing.outQuart }}>
          <Text
            fontSize="xs"
            fontWeight="700"
            color="brand.400"
            letterSpacing="widest"
            textTransform="uppercase"
            fontFamily="heading">
            Primary Stack
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easing.outQuart, delay: 0.08 }}>
          <Text fontSize="md" color="gray.500" fontFamily="body" maxW="2xl" lineHeight="1.7">
            The tools I actually reach for when a project gets serious. Not everything I&apos;ve
            touched, just the stuff that shows up again and again.
          </Text>
        </motion.div>
      </VStack>

      <motion.div
        variants={cardContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}>
        <SimpleGrid columns={[1, 2, 3, 4]} gap={6} px={4} mx="auto" maxW="container.xl" mb={16}>
          {primaryStack.map((item) => (
            <motion.div key={item.title} variants={cardItem}>
              <AboutCard
                src={item.src}
                title={item.title}
                description={item.context}
                website={item.website}
              />
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <Separator mb={12} w={["90%", "75%", "80%"]} mx="auto" borderColor="gray.800" />
      </motion.div>

      {/* ── Also Worked With ── */}
      <VStack gap={6} align="start" w={["90%", "75%", "80%"]} mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: easing.outQuart }}>
          <Text
            fontSize="xs"
            fontWeight="700"
            color="brand.400"
            letterSpacing="widest"
            textTransform="uppercase"
            fontFamily="heading">
            Also Worked With
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: easing.outQuart, delay: 0.08 }}>
          <Text fontSize="md" color="gray.500" fontFamily="body" maxW="2xl" lineHeight="1.7">
            Other languages and libraries I&apos;ve used on real projects. Some more than others.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.1 }}>
          <Flex gap={2} flexWrap="wrap">
            {otherTools.map((name) => (
              <Box
                key={name}
                px={3}
                py={1.5}
                borderRadius="md"
                bg="gray.850"
                border="1px solid"
                borderColor="gray.800"
                color="gray.400"
                fontSize="sm"
                fontWeight="500"
                fontFamily="body"
                transition="border-color 0.2s, color 0.2s"
                _hover={{ borderColor: "brand.400", color: "brand.400" }}>
                {name}
              </Box>
            ))}
          </Flex>
        </motion.div>
      </VStack>
    </Box>
  );
}
