import React from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import SocialIcons from "../components/SocialIcons";

const ThankYouPage = () => {
  const headingSize = useBreakpointValue({
    base: "2xl",
    md: "4xl",
  });

  const textSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  return (
    <Box
      w="80%"
      h="100%"
      minH="calc(100vh - 150px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize={headingSize} mb={6} textAlign="center">
        Thank you for your purchase!
      </Heading>
      <Text fontSize={textSize} mb={4} textAlign="center">
        Artefice, The Maker, will send you an email with your order's details.
      </Text>
      <Button as="a" href="/" mb={4} fontSize={textSize}>
        Back to Home
      </Button>
      <Text fontSize={textSize}>Share your experience with us.</Text>
      <SocialIcons />
    </Box>
  );
};

export default ThankYouPage;
