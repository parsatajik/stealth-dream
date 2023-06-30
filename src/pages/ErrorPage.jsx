import { useRouteError } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minW="100vw"
      minHeight="100vh"
      gap="20px"
    >
      <Text as="h1" fontSize="5xl" fontWeight="bold">
        Oops!
      </Text>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text color="blackAlpha.500">
        <i>{error.statusText || error.message}</i>
      </Text>
    </Box>
  );
};

export default ErrorPage;
