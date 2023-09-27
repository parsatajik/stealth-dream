import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  ButtonGroup,
  Box,
  Flex,
} from "@chakra-ui/react";

import { ART_STYLES, ARTISTS, TEXTURES } from "../constants";

const CustomButtonGroup = ({ items, selectedItem, setSelectedItem }) => {
  const handleSelect = (name) => {
    if (selectedItem === name) {
      setSelectedItem("");
    } else {
      setSelectedItem(name);
    }
  };

  return (
    <ButtonGroup
      gap="4"
      pt={4}
      diplsay="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="center"
    >
      {items.map((item, i) => (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          key={`item-${item.name}-btn-${i}`}
        >
          <Button
            title={item.name}
            bgImage={item.img}
            bgSize="cover"
            opacity={selectedItem === item.name ? "0.8" : "1"}
            border={selectedItem === item.name ? "2px solid cyan" : ""}
            w="70px"
            h="70px"
            onClick={() => handleSelect(item.name)}
            focusBorderColor="transparent"
            _hover={{ opacity: "0.7", border: "none" }}
            _focus={{ border: "none" }}
          />
          <Box pt="10px" fontSize="14px">
            {item.name}
          </Box>
        </Flex>
      ))}
    </ButtonGroup>
  );
};

const StyleCustomizer = ({
  selectedArtStyle,
  setSelectedArtStyle,
  selectedArtist,
  setSelectedArtist,
  selectedTexture,
  setSelectedTexture,
  expandedAccordionIndices,
  setExpandedAccordionIndices,
}) => {
  return (
    <>
      <Accordion
        allowMultiple
        size="lg"
        mt="20px"
        w="80%"
        boxShadow="md"
        index={expandedAccordionIndices}
        onChange={setExpandedAccordionIndices}
      >
        <AccordionItem>
          <h2>
            <AccordionButton
              backgroundColor="blackAlpha.100"
              boxShadow="md"
              borderRadius="0px"
            >
              <Box as="span" flex="1" textAlign="left">
                Artist
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} overflow="hidden">
            <CustomButtonGroup
              items={ARTISTS}
              selectedItem={selectedArtist}
              setSelectedItem={setSelectedArtist}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              backgroundColor="blackAlpha.100"
              boxShadow="md"
              borderRadius="0px"
            >
              <Box as="span" flex="1" textAlign="left">
                Art Style
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} overflow="hidden">
            <CustomButtonGroup
              items={ART_STYLES}
              selectedItem={selectedArtStyle}
              setSelectedItem={setSelectedArtStyle}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              backgroundColor="blackAlpha.100"
              boxShadow="md"
              borderRadius="0px"
            >
              <Box as="span" flex="1" textAlign="left">
                Texture
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <CustomButtonGroup
              items={TEXTURES}
              selectedItem={selectedTexture}
              setSelectedItem={setSelectedTexture}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default StyleCustomizer;
