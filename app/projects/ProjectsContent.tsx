"use client";

import { Box, SimpleGrid, Heading, Text, Button, Container, Separator } from "@chakra-ui/react";
import { motion, AnimatePresence } from "motion/react";
import { Tooltip } from "../../components/ui/tooltip";
import { ArrowUp } from "lucide-react";
import Project from "../../components/Project";
import projectsData from "./projectsData";
import { useState, useEffect } from "react";
import { easing, stagger } from "../../utils/motion";

const sectionLabel = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: easing.outQuart },
};

const cardContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: stagger.fast, delayChildren: 0.05 },
  },
  viewport: { once: true, margin: "-60px" },
};

const cardItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easing.outQuart },
};

export default function ProjectsContent() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured && !p.clientSite);
  const clientSites = projectsData.filter((p) => p.clientSite);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box as="main" id="main-content" position="relative" pb={16}>
      <Container maxW="7xl" px={{ base: 4, md: 8 }} mt={{ base: 8, md: 16 }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easing.outQuart }}>
          <Heading
            as="h1"
            fontSize={["4xl", "5xl", "6xl"]}
            color="gray.100"
            mb={3}
            letterSpacing="-0.03em"
            fontFamily="heading"
            fontWeight="700">
            Projects
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easing.outQuart, delay: 0.12 }}>
          <Text fontSize="lg" color="gray.400" mb={12} fontFamily="body">
            Selected work across website development, smart city platforms, pharmacy automation, and
            dashboard tools.
          </Text>
        </motion.div>

        {/* Featured tier */}
        <motion.div {...sectionLabel}>
          <Text
            fontSize="xs"
            fontWeight="700"
            color="brand.400"
            letterSpacing="widest"
            textTransform="uppercase"
            mb={6}
            fontFamily="heading">
            Featured
          </Text>
        </motion.div>

        <motion.div
          variants={cardContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-60px" }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }} mb={16}>
            {featuredProjects.map((project) => (
              <motion.div key={project.slug} variants={cardItem}>
                <Project
                  images={project.images}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  slug={project.slug}
                  tags={project.tags}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        {/* Other work tier */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}>
              <Separator mb={10} borderColor="gray.800" />
            </motion.div>

            <motion.div {...sectionLabel}>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="brand.400"
                letterSpacing="widest"
                textTransform="uppercase"
                mb={6}
                fontFamily="heading">
                Other Work
              </Text>
            </motion.div>

            <motion.div
              variants={cardContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-60px" }}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }} mb={16}>
                {otherProjects.map((project) => (
                  <motion.div key={project.slug} variants={cardItem}>
                    <Project
                      images={project.images}
                      title={project.title}
                      subtitle={project.subtitle}
                      description={project.description}
                      slug={project.slug}
                      tags={project.tags}
                    />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </>
        )}

        {/* Client sites tier */}
        {clientSites.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}>
              <Separator mb={10} borderColor="gray.800" />
            </motion.div>

            <motion.div {...sectionLabel}>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="brand.400"
                letterSpacing="widest"
                textTransform="uppercase"
                mb={2}
                fontFamily="heading">
                Client Sites
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: easing.outQuart, delay: 0.08 }}>
              <Text fontSize="sm" color="gray.500" mb={8} fontFamily="body">
                Shipped frontend work for real clients.
              </Text>
            </motion.div>

            <motion.div
              variants={cardContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-60px" }}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }}>
                {clientSites.map((project) => (
                  <motion.div key={project.slug} variants={cardItem}>
                    <Project
                      images={project.images}
                      title={project.title}
                      subtitle={project.subtitle}
                      description={project.description}
                      slug={project.slug}
                      tags={project.tags}
                    />
                  </motion.div>
                ))}
              </SimpleGrid>
            </motion.div>
          </>
        )}
      </Container>

      {/* Scroll-to-top FAB with animated entrance/exit */}
      <AnimatePresence>
        {showScrollTopButton && (
          <Tooltip content="Scroll to top" positioning={{ placement: "left" }}>
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.85 }}
              transition={{ duration: 0.25, ease: easing.outQuart }}
              style={{ position: "fixed", bottom: "40px", right: "40px" }}>
              <Button
                onClick={scrollToTop}
                w={14}
                h={14}
                borderRadius="full"
                bg="brand.500"
                color="gray.950"
                _hover={{ bg: "brand.400", transform: "scale(1.05)" }}
                boxShadow="0 4px 24px rgba(255, 179, 0, 0.3)"
                aria-label="Scroll to top"
                transition="transform 0.2s var(--ease-out-quart), background 0.2s"
                _focusVisible={{ boxShadow: "outline" }}>
                <ArrowUp size={22} />
              </Button>
            </motion.div>
          </Tooltip>
        )}
      </AnimatePresence>
    </Box>
  );
}
