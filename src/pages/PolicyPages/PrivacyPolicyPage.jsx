import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Artefice</title>
        <meta
          name="description"
          content="Your privacy is important to us. Learn how Artefice protects your personal information in our Privacy Policy."
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
          PRIVACY POLICY
        </Text>
        <Text mb="10px">
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          drmersclub.com (the “Site”).
        </Text>
        <Text fontWeight="bold" mb="-15px">
          Personal information we collect
        </Text>
        <Text>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information”.
        </Text>
        <Text>
          We collect Device Information using the following technologies:
        </Text>
        <ul style={{ listStyleType: "none" }}>
          <li>
            - “Cookies” are data files that are placed on your device or
            computer and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </li>
          <li>
            - “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </li>
          <li>
            - “Web beacons”, “tags”, and “pixels” are electronic files used to
            record information about how you browse the Site.
          </li>
        </ul>
        <Text>
          Additionally when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers, email address, and phone number). We
          refer to this information as “Order Information”.
        </Text>
        <Text>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </Text>
        <Text fontWeight="bold" mb="-15px">
          How do we use your personal information?
        </Text>
        <Text>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
        </Text>
        <ul style={{ listStyleType: "none" }}>
          <li>- Communicate with you;</li>
          <li>- Screen our orders for potential risk or fraud; and</li>
          <li>
            - When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
        </ul>
        <Text>
          When you purchase something from our store, as part of the buying and
          selling process, we collect the personal information you give us such
          as your name, address and email address.
        </Text>
        <Text>
          When you browse our store, we also automatically receive your
          computer’s internet protocol (IP) address in order to provide us with
          information that helps us learn about your browser and operating
          system.
        </Text>
        <Text>
          Email marketing (if applicable): With your permission, we may send you
          emails about our store, new products and other updates.
        </Text>
        <Text>
          Text marketing (if applicable): With your permission, we may send text
          messages about our store, new products, and other updates. Updates
          include Checkout Reminders. Webhooks will be used to trigger the
          Checkout Reminders messaging system.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Behavioural advertising
        </Text>
        <Text>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at
          http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
        </Text>
        <Text>
          You can opt out of targeted advertising by using the links below:
        </Text>
        <ul style={{ listStyleType: "none" }}>
          <li>- Facebook: https://www.facebook.com/settings/?tab=ads</li>
          <li>- Google: https://www.google.com/settings/ads/anonymous</li>
          <li>
            - Bing:
            https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
          </li>
        </ul>
        <Text>
          Additionally, you can opt out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at:
          http://optout.aboutads.info/.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Do not track
        </Text>
        <Text>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Your rights
        </Text>
        <Text>
          If you are a Canadian resident, you have the right to access personal
          information we hold about you and to ask that your personal
          information be corrected, updated, or deleted. If you would like to
          exercise this right, please contact us through the contact information
          below.
        </Text>
        <Text>
          Additionally, if you are a Canadian resident we note that we are
          processing your information in order to fulfill contracts we might
          have with you (for example if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information will not be
          transferred outside of Canada and the United States.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Data retention
        </Text>
        <Text>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Changes
        </Text>
        <Text>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </Text>

        <Text fontWeight="bold" mb="-15px">
          Contact us
        </Text>
        <Text>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e‑mail at{" "}
          <Link href="mailto:support@artefice.ai">suppor@artefice.ai</Link> or
          visit our contact page.
        </Text>

        <Text>Artefice</Text>

        <Text>361 Front St. W.</Text>

        <Text>Toronto, ON, M5V 3R5, Canada</Text>
      </Box>
    </>
  );
};

export default PrivacyPolicyPage;
