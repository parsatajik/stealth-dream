import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RefundPolicyPage = () => {
  return (
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
        REFUND POLICY
      </Text>
      <Text fontWeight="bold" mb="-15px">
        IMPORTANT NOTE
      </Text>
      <Text>
        We recommend making sure of your order before placing it to avoid any
        unnecessary hassle.
      </Text>
      <Text>
        You can email us to change size/colour (based on availability) if we
        have not fulfilled your order yet. However, no changes can be made once
        your order has been fulfilled and shipped out of our warehouse.
      </Text>
      <Text>We will not cancel any orders once the order is confirmed.</Text>
      <Text>
        You have 14 days from the date of delivery to email us at
        support@artefice.ai to request a return or exchange.
      </Text>

      <Text fontWeight="bold" color="red">
        If 14 days have gone by since your purchase, unfortunately, we CANNOT
        offer you a return or exchange.
      </Text>

      <Text fontWeight="bold" mb="-15px">
        Exchanges
      </Text>
      <Text>
        We do not exchange items unless the original product was incorrectly
        shipped or defective. We do not accept any other reasons (ie. personal
        reasons) for exchanges and will not send over a replacement. Please make
        sure of your items before placing your order (!!!!)
      </Text>

      <Text fontWeight="bold" mb="-15px">
        Returns
      </Text>
      <Text>
        Returns will only be accepted in exchange for{" "}
        <Text fontWeight="bold" as="span">
          STORE CREDIT ONLY
        </Text>
        .
      </Text>
      <Text>Please email support@artefice.ai to process your refund.</Text>
      <Text>
        If your request is approved, you’ll be sent a store credit code via.
        email.
      </Text>
      <Text fontWeight="bold">
        To be eligible for a return, your items must be unworn, unwashed, and in
        its original condition, with all tags attached.
      </Text>

      <Text>
        * Please note you will be responsible to pay for return shipping costs.
        The original shipping cost is non-refundable as we've incurred the cost
        to ship the items to you already.
      </Text>
      <Text>
        We strongly suggest purchasing a return label that has tracking if your
        order value is high (in case your package gets lost) We will not be
        liable for any lost return packages.
      </Text>

      <Text fontWeight="bold" mb="-15px">
        Damages and Issues
      </Text>
      <Text>
        No matter how much care we put into our pieces, factory defects are
        unavoidable and we're not perfect (it happens—we're so so so sorry!)
        Please inspect your order upon receipt and contact us immediately if the
        item is defective, damaged or if you've received the wrong item. We will
        evaluate the issue with photos and make it right for you, don't worry{" "}
        {":)"}
      </Text>

      <Text fontWeight="bold" mb="-15px">
        Sale Merchandise
      </Text>
      <Text>
        All sale items are final sale and cannot be returned or exchanged.
        Unless the item is defective or damaged.
      </Text>
    </Box>
  );
};

export default RefundPolicyPage;
