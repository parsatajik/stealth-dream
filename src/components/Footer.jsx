import React from "react";
import { Box, useBreakpointValue, Text, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import EmailInput from "./EmailInput";
import SocialIcons from "./SocialIcons";

import AMEX from "../assets/paymentIcons/amex.png";
import APPLEPAY from "../assets/paymentIcons/apple-pay.png";
import GOOGLEPAY from "../assets/paymentIcons/google-pay.png";
import MASTERCARD from "../assets/paymentIcons/mastercard.png";
import PAYPAL from "../assets/paymentIcons/paypal.png";
import VISA from "../assets/paymentIcons/visa.png";

const CustomLink = ({ children, url }) => {
  return (
    <Link
      fontSize="sm"
      color="blackAlpha.600"
      fontWeight="normal"
      as={RouterLink}
      to={url}
    >
      {children}
    </Link>
  );
};

const Footer = () => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "1.5fr 1fr 1fr",
  });

  return (
    <Box
      w="100%"
      p="30px 10% 30px 10%"
      bgColor="blackAlpha.100"
      mt="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow="xl"
    >
      <Box display="grid" gridTemplateColumns={gridTemplateColumns} gap="50px">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          gap="10px"
        >
          <Text
            fontSize="sm"
            fontWeight="bold"
            mb="10px"
            color="blackAlpha.800"
          >
            Join the Makers
          </Text>
          <Text fontSize="sm" color="blackAlpha.600">
            We don't spam, but we do send out really fun emails and exclusive
            deals. Guess you'll have to find out and see for yourself {";)"}
          </Text>

          <EmailInput />

          <SocialIcons />
        </Box>
        <Box display="flex" flexDirection="column" gap="10px">
          <Text
            fontSize="sm"
            fontWeight="bold"
            mb="10px"
            color="blackAlpha.800"
          >
            Important Links
          </Text>
          <CustomLink url="contact-us">Contact Us</CustomLink>
          <CustomLink url="policies/terms-of-service">
            Terms of Service
          </CustomLink>
          <CustomLink url="become-an-affiliate">Become an Affiliate</CustomLink>
        </Box>
        <Box display="flex" flexDirection="column" gap="10px">
          <Text
            fontSize="sm"
            fontWeight="bold"
            mb="10px"
            color="blackAlpha.800"
          >
            Our Policies
          </Text>
          <CustomLink url="policies/privacy-policy">Privacy Policy</CustomLink>
          <CustomLink url="policies/shipping-policy">
            Shipping Policy
          </CustomLink>
          <CustomLink url="policies/refund-policy">Refund Policy</CustomLink>
          <CustomLink url="policies/terms-of-service">
            Terms of Service
          </CustomLink>
        </Box>
      </Box>
      <Text fontSize="sm" color="blackAlpha.600" mt="20px">
        Canada (CAD $)
      </Text>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        mt="30px"
      >
        <Image src={AMEX} alt="American Express" w="35px" borderRadius="2px" />
        <Image src={APPLEPAY} alt="Apple Pay" w="35px" />
        <Image src={GOOGLEPAY} alt="Google Pay" w="35px" />
        <Image src={MASTERCARD} alt="Mastercard" w="35px" />
        <Image src={PAYPAL} alt="Paypal" w="35px" />
        <Image src={VISA} alt="Visa" w="35px" />
      </Box>
      <Text fontSize="xs" color="blackAlpha.600" mt="10px" textAlign="center">
        © 2023 Artefice. All Rights Reserved. Powered by{" "}
        <Link href="https://www.bloorsoft.com/" target="_blank">
          bloorsoft.com
        </Link>
        .
      </Text>
    </Box>
  );
};

export default Footer;
