import React from "react";
import { Helmet } from "react-helmet";
import { Box, Text } from "@chakra-ui/react";

const ShippingPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy - Artefice</title>
        <meta
          name="description"
          content="Learn about Artefice's shipping policy. Find out how we deliver your unique, AI-infused fashion pieces to your doorstep."
        />
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        m="40px auto"
        pl="20px"
        pr="20px"
        maxW="65ch"
        fontSize="sm"
        gap="15px"
      >
        <Text fontSize="3xl" as="h1" fontWeight="bold" alignSelf="center">
          SHIPPING POLICY
        </Text>
        <Text>
          After placing your order, it takes about{" "}
          <Text as="span" fontWeight="bold">
            1 to 3 business days
          </Text>{" "}
          to process your order.
        </Text>
        <Text>
          Orders placed on the weekend will not be fulfilled until Monday or
          Tuesday depending on the backlog of orders.
        </Text>
        <Text>
          Once your order is shipped, you will immediately receive an email with
          your tracking information. Sometimes couriers take a few days to
          update tracking information.
        </Text>
        <Text>
          Estimated delivery times once your package leaves the warehouse:
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            Canada:
          </Text>{" "}
          6-15 business days
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            USA*:
          </Text>{" "}
          6-15 business days
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            Rest of World:
          </Text>{" "}
          Currently not supported.
        </Text>

        <Text>* Hawaii and Guam will take longer ~30 days</Text>

        <Text>
          There may be delays due to external factors that are{" "}
          <Text as="span" fontWeight="bold">
            {" "}
            out of our control{" "}
          </Text>
          (ie. weather, courier delays, weekends, holidays, etc).
        </Text>

        <Text>
          We offer free shipping over certain order values depending on your
          location.
        </Text>

        <Text>
          We are NOT responsible if you input the incorrect delivery address.
        </Text>

        <Text>
          We are NOT responsible if you input the incorrect delivery address.
        </Text>
      </Box>
    </>
  );
};

export default ShippingPolicyPage;
