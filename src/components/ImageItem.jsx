import React, { useState } from "react";
import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";

const ImageItem = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);

  const textFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  return (
    <Fade>
      <Box
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={image.url} alt={image.alt} objectFit="cover" w="100%" />
        {isHovered && (
          <Text
            position="absolute"
            bottom="0"
            left="0"
            p="2"
            bgColor="white"
            opacity="90%"
            width="full"
            height="full"
            fontSize={textFontSize}
            padding="20px"
            color="blackAlpha.800"
          >
            {image.alt}
          </Text>
        )}
      </Box>
    </Fade>
  );
};

export default ImageItem;
