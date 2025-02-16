import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Divider,
  Spinner,
  useBreakpointValue,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  query,
  arrayUnion,
  where,
  updateDoc,
  getDocs,
} from "@firebase/firestore";
import mixpanel from "mixpanel-browser";
import { db } from "../firebase";
import { TSHIRT_COST } from "../constants";

const CheckoutForm = ({
  selectedImage,
  selectedColor,
  selectedSize,
  selectedQuantity,
  dreamInput,
  isShareable,
  paymentIntentId,
  totalOrderCost,
  setTotalOrderCost,
}) => {
  const [email, setEmail] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponWasUsed, setCouponWasUsed] = useState(false);
  const [affiliate, setAffiliate] = useState("");
  const [affiliateWasUsed, setAffiliateWasUsed] = useState(false);
  const [shippingCost] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchShippingEstimate = async () => {
      try {
        const response = await axios.post(
          `/api/estimateShipping`,
          {
            toAddress: customerInfo.address,
            weight: {
              value: 166 + 150 * selectedQuantity,
              unit: "grams",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchShippingEstimate();
  }, [customerInfo.address]);

  const inputFontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const checkAffiliate = async () => {
    try {
      if (affiliateWasUsed) {
        toast({
          title: "Error",
          description: "You have already used an affiliate code!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        return;
      }

      const response = await axios.post(
        "/api/checkAffiliate",
        { code: affiliate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setAffiliateWasUsed(true);
      } else {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred while checking the affiliate code.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const checkCoupon = async () => {
    try {
      if (couponWasUsed) {
        toast({
          title: "Error",
          description: "You have already used a coupon!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        return;
      }

      const response = await axios.post(
        "/api/checkCoupon",
        { code: coupon },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, percentage, message } = response.data;

      if (success) {
        setTotalOrderCost((state) => Math.ceil(state * (1 - percentage / 100)));
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setCouponWasUsed(true);
      } else {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred while checking the coupon code.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const sendPaymentReceipt = async () => {
    try {
      await axios.post(`/api/updatePaymentIntent`, {
        paymentIntentId,
        params: { receipt_email: email },
      });
    } catch (err) {
      console.error("An error occurred while sending the payment receipt.");
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email, shipping address, and full name are filled out
    if (!email || !customerInfo.address || !customerInfo.name) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    let timeoutId = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred while processing your payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }, 10000);

    let stripeError;

    if (totalOrderCost > 0) {
      const res = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      stripeError = res.error;
    }

    if (totalOrderCost > 0 && stripeError) {
      console.error(error);
      setIsLoading(false);
      alert("There was an error with processing your payment.");
    } else {
      try {
        if (totalOrderCost > 0) await sendPaymentReceipt();

        const response = await axios.post(
          "/api/storeImage",
          { imageUrl: selectedImage },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const imageData = response.data.originalUrl;
        const webpUrl = response.data.webpUrl;

        const purchase = {
          date: new Date().toISOString(),
          email,
          customerInfo,
          prompt: dreamInput,
          selectedColor,
          selectedSize,
          selectedQuantity,
          selectedImage: imageData,
          isShareable,
          totalOrderCost,
          webpUrl,
        };

        const docRef = await addDoc(collection(db, "purchases"), purchase);

        if (affiliate.length > 0) {
          const q = query(
            collection(db, "affiliates"),
            where("username", "==", affiliate)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              affiliatedPurchases: arrayUnion(docRef),
            });
            console.log(
              `Affiliate ${affiliate} has been updated with the new purchase.`
            );
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        clearTimeout(timeoutId);
        navigate("/thank-you");
      }
    }
  };

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "1fr 1fr",
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "80%",
        backgroundColor: "white",
        padding: "30px",
        display: "grid",
        gridTemplateColumns: `${gridTemplateColumns}`,
        gap: "30px",
      }}
    >
      <Box display="flex" flexDir="column" gap="20px">
        <Box>
          <Text as="h3" fontWeight="bold" mb="5px">
            Contact info
          </Text>
          <LinkAuthenticationElement
            onChange={(event) => setEmail(event.value.email)}
          />
        </Box>
        <Box>
          <Text as="h3" fontWeight="bold" mb="5px">
            Shipping
          </Text>
          <AddressElement
            options={{ mode: "shipping", allowedCountries: ["CA"] }}
            mb="10px"
            onChange={(event) => {
              if (event.complete) {
                setCustomerInfo(event.value);
              }
            }}
          />
        </Box>
        <Box>
          <Text as="h3" fontWeight="bold" mb="5px">
            Payment
          </Text>
          <PaymentElement />
        </Box>
      </Box>
      <Box
        padding="20px"
        borderColor="blackAlpha.200"
        borderStyle="sold"
        borderWidth="1px"
        h="fit-content"
        borderRadius="5px"
        boxShadow="md"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb="10px"
        >
          <Text fontSize={inputFontSize}>{`Subtotal (${selectedQuantity} ${
            selectedQuantity === 1 ? "item" : "items"
          })`}</Text>
          <Text fontSize={inputFontSize}>{`$${totalOrderCost}`}</Text>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb="15px"
        >
          <Text fontSize={inputFontSize}>{"Shipping"}</Text>
          <Text fontSize={inputFontSize}>
            {shippingCost > 0 ? shippingCost : "TBD"}
          </Text>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Input
            placeholder="Gift or discount code"
            w="85%"
            fontSize={inputFontSize}
            p="8px"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && coupon.length) {
                checkCoupon();
              }
            }}
            disabled={couponWasUsed}
          />
          <Button
            bgColor="blackAlpha.800"
            color="white"
            fontSize={inputFontSize}
            w="25%"
            _hover={{ opacity: "0.7", border: "none" }}
            onClick={checkCoupon}
          >
            Apply
          </Button>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt="15px"
        >
          <Input
            placeholder="Affiliate code (optional)"
            w="85%"
            fontSize={inputFontSize}
            p="8px"
            value={affiliate}
            onChange={(event) => setAffiliate(event.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && coupon.length) {
                checkAffiliate();
              }
            }}
            disabled={affiliateWasUsed}
          />
          <Button
            bgColor="blackAlpha.800"
            color="white"
            w="25%"
            fontSize={inputFontSize}
            _hover={{ opacity: "0.7", border: "none" }}
            onClick={checkAffiliate}
          >
            Apply
          </Button>
        </Stack>

        <Divider
          orientation="horizontal"
          size="100px"
          borderColor="blackAlpha.400"
          mt="20px"
          mb="20px"
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={inputFontSize} fontWeight="bold">
            {"Total"}
          </Text>
          <Text fontSize={inputFontSize} fontWeight="bold">
            {`$${totalOrderCost}`}
          </Text>
        </Stack>
        <Button
          w="100%"
          mt="20px"
          size="lg"
          type="submit"
          bgColor="blackAlpha.800"
          color="white"
          _hover={{ opacity: "0.7", border: "none" }}
        >
          Place Order
        </Button>
        {isLoading && (
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            borderRadius="5px"
            bgColor="cyan.100"
            padding="10px"
            mt="20px"
          >
            <Text fontSize="sm" color="blackAlpha.700">
              Processing your purchase...
            </Text>
            <Spinner
              size="lg"
              thickness="4px"
              color="cyan.500"
              emptyColor="gray.200"
            />
          </Stack>
        )}
      </Box>
    </form>
  );
};

export default CheckoutForm;
