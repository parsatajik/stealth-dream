import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import App from "./App";
import ThankYouPage from "./pages/ThankYouPage";
import ErrorPage from "./pages/ErrorPage";
import CreatePage from "./pages/CreatePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PolicyPages/PrivacyPolicyPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { loader as createPageLoader } from "./pages/CreatePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import theme from "./theme";

import "@fontsource/roboto/400.css";
import TermsOfServicePage from "./pages/PolicyPages/TermsOfServicePage";
import ShippingPolicyPage from "./pages/PolicyPages/ShippingPolicyPage";
import RefundPolicyPage from "./pages/PolicyPages/RefundPolicyPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "thank-you", element: <ThankYouPage /> },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "contact-us", element: <ContactUsPage /> },
      {
        path: "policies/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "become-an-affiliate",
        element: <ComingSoonPage />,
      },
      {
        path: "policies/terms-of-service",
        element: <TermsOfServicePage />,
      },
      {
        path: "policies/shipping-policy",
        element: <ShippingPolicyPage />,
      },
      {
        path: "policies/refund-policy",
        element: <RefundPolicyPage />,
      },
      {
        index: true,
        element: <CreatePage />,
        loader: createPageLoader(queryClient),
      },
    ],
  },
]);

mixpanel.init(import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        <ReactQueryDevtools position="bottom-right" />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
