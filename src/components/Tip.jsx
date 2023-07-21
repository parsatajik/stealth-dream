import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";

const Tip = ({ imgSrc, tipText, tipPrompt }) => {
  const tipContainerDirection = useBreakpointValue({
    base: "column-reverse",
    md: "row",
  });

  const imgW = useBreakpointValue({
    base: "100%",
    md: "350px",
  });

  const tipPromptFontSize = useBreakpointValue({
    base: "lg",
    md: "2xl",
  });

  const tipTextFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const tipTextMarginBottom = useBreakpointValue({
    base: "10px",
    md: "0",
  });

  const tipPadding = useBreakpointValue({
    base: "40px",
    md: "60px",
  });

  return (
    <Box
      display="flex"
      mt="20px"
      flexDirection={tipContainerDirection}
      mb="10px"
    >
      <Image src={imgSrc} w={imgW} h="auto" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={tipPadding}
        w="100%"
        bgColor="blackAlpha.200"
      >
        <Box
          fontSize={tipTextFontSize}
          color="blackAlpha.600"
          mb={tipTextMarginBottom}
        >
          <Text fontWeight="bold">Tip</Text>
          <Text>{tipText}</Text>
        </Box>
        <Text
          fontSize={tipPromptFontSize}
          fontWeight="bold"
        >{`"${tipPrompt}"`}</Text>
      </Box>
    </Box>
  );
};

export default Tip;
