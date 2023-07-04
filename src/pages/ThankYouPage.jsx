import React from "react";
import { Button, Box, Heading, Text, Link, Stack } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

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
        <Link href="https://www.twitter.com/arteficeai" isExternal>
          <FaTwitter size="24px" />
        </Link>
        <Link href="https://www.instagram.com/arteficeai" isExternal>
          <FaInstagram size="24px" />
        </Link>
        <Link href="https://www.tiktok.com/@arteficeai" isExternal>
          <FaTiktok size="24px" />
        </Link>
      </Stack>
    </Box>
  );
};

export default ThankYouPage;
