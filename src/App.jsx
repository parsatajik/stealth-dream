import { Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import "./App.css";

const SERVER = `${import.meta.env.VITE_SERVER_URL}/api`;

function App() {
  const [dreamInput, setDreamInput] = useState("");
  const [currImg, setCurrImg] = useState("");

  const fetchImage = async (dream) => {
    try {
      const response = await axios.post(
        `/api/generateImage`,
        {
          dream: dream,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data[0].url;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Welcome to Dreamware!
      </Text>
      <Input
        placeholder="Tell me what you are dreaming about..."
        size="lg"
        variant={"filled"}
        w="50%"
        mt="40px"
        onChange={(e) => setDreamInput(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            console.log(dreamInput);
            try {
              const url = await fetchImage(dreamInput);
              setCurrImg(url);
            } catch (e) {
              console.log(e);
            }
          }
        }}
      />
      <Image src={currImg} mt="60px" />
    </div>
  );
}

export default App;
