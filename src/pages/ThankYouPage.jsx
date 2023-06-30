import React from "react";
import { Button, Box, Heading, Text, Link, Stack } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const ThankYouPage = () => {
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
      <Heading mb={6} textAlign="center">
        Thank you for your purchase!
      </Heading>
      <Text mb={4} textAlign="center">
        Artefice, The Maker, will send you an email with your order's details.
      </Text>
      <Button as="a" href="/" colorScheme="blue" mb={4}>
        Back to Home
      </Button>
      <Text mb={2}>Share your experience with us:</Text>
      <Stack spacing={2} mb={4} direction="row">
        <Link href="https://www.facebook.com/YourBusinessName" isExternal>
          <FaFacebookF size="24px" />
        </Link>
        <Link href="https://www.twitter.com/YourBusinessName" isExternal>
          <FaTwitter size="24px" />
        </Link>
        <Link href="https://www.instagram.com/YourBusinessName" isExternal>
          <FaInstagram size="24px" />
        </Link>
      </Stack>
      {/* <Button
        as="a"
        href="https://www.google.com/search?q=YourBusinessName&rlz=1C1GCEV_en&sxsrf=AOaemvKihpU7rmam5_R5rqQ4-9S1gOl-ZA:1638596414075&source=lnt&tbs=lf:1,lf_ui:2&tbm=lcl&rflfq=1&num=10&rldimm=12157529923004273250&lqi=Cg5Zb3VyQnVzaW5lc3NOYW1ligELC3NlYXJjaC1hZHNyZgKDA1AAEAEYAhgKGmNvbW1lcmNpYWxfbG9jYWxfcmVzdWx0EAEQAhADGAAYARgCGAMiCg5Zb3VyQnVzaW5lc3NOYW1lUgA"
        colorScheme="green"
      >
        Write a Google Review
      </Button> */}
    </Box>
  );
};

export default ThankYouPage;
