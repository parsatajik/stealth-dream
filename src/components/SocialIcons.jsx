import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaPinterest, FaInstagram, FaTiktok } from "react-icons/fa";

const SocialIcons = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Box display="flex" flexDirection="row" gap="10px" mt="20px">
      <IconButton
        colorScheme="gray"
        aria-label="Artefice Instagram"
        icon={<FaInstagram />}
        isRound
        onClick={() => openInNewTab("https://www.instagram.com/artefice.ai")}
      />
      <IconButton
        colorScheme="gray"
        aria-label="Artefice TikTok"
        icon={<FaTiktok />}
        isRound
        onClick={() => openInNewTab("https://www.tiktok.com/@artefice.ai")}
      />
      <IconButton
        colorScheme="gray"
        aria-label="Artefice Pinterest"
        icon={<FaPinterest />}
        isRound
        onClick={() => openInNewTab("https://www.pinterest.com/arteficeai")}
      />
    </Box>
  );
};

export default SocialIcons;
