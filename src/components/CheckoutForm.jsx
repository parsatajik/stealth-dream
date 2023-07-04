import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Divider,
  Spinner,
  useBreakpointValue,
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

const CheckoutForm = ({
  selectedImage,
  selectedColor,
  selectedSize,
  selectedQuantity,
  dreamInput,
  isShareable,
  affiliate,
  paymentIntentId,
}) => {
  const [email, setEmail] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const sendPaymentReceipt = async () => {
    try {
      await axios.post(`/api/updatePaymentIntent`, {
        email,
        paymentIntentId,
      });
    } catch (err) {
      console.error("An error occurred while sending the payment receipt.");
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading((state) => !state);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      setIsLoading(false);
      alert("There was an error with processing your payment.");
    } else {
      try {
        await sendPaymentReceipt();

        const response = await axios.post(
          "/api/storeImage",
          { imageUrl: selectedImage },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const imageData = response.data.url;

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
        };

        const docRef = await addDoc(collection(db, "purchases"), purchase);

        if (affiliate) {
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

        navigate("/thank-you");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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
            options={{
              defaultValues: {
                email: "foo@bar.com",
              },
            }}
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
          <Text size="md">{"Subtotal (1 item)"}</Text>
          <Text size="md">{"$27.00"}</Text>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text size="md">{"Shipping"}</Text>
          <Text size="md">{"FREE"}</Text>
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
          <Text size="md" fontWeight="bold">
            {"Total"}
          </Text>
          <Text size="md" fontWeight="bold">
            {"$27.00"}
          </Text>
        </Stack>
        <Button
          w="100%"
          mt="20px"
          size="lg"
          colorScheme="messenger"
          type="submit"
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
