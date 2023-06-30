import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ThankYouPage from "./pages/ThankYouPage";
import ErrorPage from "./pages/ErrorPage";
import CreatePage from "./pages/CreatePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactPage";
import { affiliateLoader } from "./pages/CreatePage";

import "./index.css";

import theme from "./theme";

import "@fontsource/roboto/400.css";

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
        path: "affiliate/:username",
        element: <CreatePage isAffiliate={true} />,
        loader: affiliateLoader,
      },
      { index: true, element: <CreatePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
