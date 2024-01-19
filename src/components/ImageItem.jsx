import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageItem = ({ image, setDreamInput, handleDesignCreation }) => {
  const [isHovered, setIsHovered] = useState(false);

  const textFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const modalTextW = useBreakpointValue({
    base: "100%",
    md: "70%",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTryDesign = () => {
    setDreamInput(image.alt);
    handleDesignCreation();
    onClose();
  };

  return (
    <>
      <Fade>
        <Box
          position="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <LazyLoadImage
            src={image.url}
            alt={image.alt}
            style={{ width: "100%", objectFit: "cover" }}
            onClick={onOpen}
          />
          <Text
            position="absolute"
            bottom="0"
            left="0"
            p="2"
            bgColor="white"
            opacity={isHovered ? "90%" : "0%"}
            width="full"
            height="full"
            fontSize={textFontSize}
            padding="20px"
            color="blackAlpha.800"
            onClick={onOpen}
            transition="opacity 0.3s ease"
          >
            {image.alt}
          </Text>
        </Box>
      </Fade>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          m="10px 8px"
        >
          <ModalBody p="0">
            <Image
              src={image.url}
              alt={image.alt}
              w="100%"
              borderTopLeftRadius="0.375rem"
              borderTopRightRadius="0.375rem"
            />
          </ModalBody>

          <ModalFooter
            w="100%"
            m="24px"
            display="flex"
            flexDirection="column"
            gap="16px"
            textAlign="center"
          >
            <Text color="blackAlpha.800" w={modalTextW}>
              {image.alt}
            </Text>
            <Button
              colorScheme="gray"
              onClick={handleTryDesign}
              w="100%"
              mt="8px"
            >
              Try this design
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageItem;
