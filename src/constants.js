import T1 from "./assets/tips/A sea otter with a pearl earring by Johannes Vermeer.png";
import T2 from "./assets/tips/A cat submarine chimera, digital art.png";
import T3 from "./assets/tips/Abstract pencil and watercolor art of a lonely robot holding a balloon.png";
import T4 from "./assets/tips/A bowl of soup that looks like a monster, knitted out of wool.png";
import T5 from "./assets/tips/Teddy bears shopping for groceries in Japan, ukiyo-e.png";
import T6 from "./assets/tips/3D render of a pink balloon dog in a violet room.png";
import T7 from "./assets/tips/A cyberpunk illustration of the San Francisco Golden Gate Bridge, digital art.png";
import T8 from "./assets/tips/A van Gogh style painting of an American football player.png";
import T9 from "./assets/tips/A futuristic cyborg poster hanging in a neon lit subway station.png";
import T10 from "./assets/tips/A photo of a teddy bear on a skateboard in Times Square.png";
import T11 from "./assets/tips/An expressive oil painting of a basketball player dunking, depicted as an explosion of a nebula.png";
import T12 from "./assets/tips/Synthwave sports car.png";
import T13 from "./assets/tips/A stained glass window depicting a robot.png";
import T14 from "./assets/tips/A bowl of soup that is also a portal to another dimension, digital art.png";
import T15 from "./assets/tips/A pencil and watercolor drawing of a bright city in the future with flying cars.png";
import T16 from "./assets/tips/An oil pastel drawing of an annoyed cat in a spaceship.png";

import P1 from "./assets/customerImages/1.png";
import P2 from "./assets/customerImages/2.png";
import P3 from "./assets/customerImages/3.png";
import P4 from "./assets/customerImages/4.png";
import P5 from "./assets/customerImages/5.png";
import P6 from "./assets/customerImages/6.png";
import P7 from "./assets/customerImages/7.png";
import P8 from "./assets/customerImages/8.png";
import P9 from "./assets/customerImages/9.png";
import P10 from "./assets/customerImages/10.png";
import P11 from "./assets/customerImages/11.png";
import P12 from "./assets/customerImages/12.png";
import P13 from "./assets/customerImages/13.png";

export const TIPS = [
  {
    imgSrc: T1,
    tipText: "Ask for images in the style of your favorite artist.",
    tipPrompt: "A sea otter with a pearl earring by Johannes Vermeer",
  },
  {
    imgSrc: T2,
    tipText: "Ask for digital arts.",
    tipPrompt: "A cat submarine chimera, digital art",
  },
  {
    imgSrc: T3,
    tipText: "Add more specific details to get exactly what you want.",
    tipPrompt:
      "Abstract pencil and watercolor art of a lonely robot holding a balloon",
  },
  {
    imgSrc: T4,
    tipText: "Ask for abstract or implausible images.",
    tipPrompt: "A bowl of soup that looks like a monster, knitted out of wool",
  },
  {
    imgSrc: T5,
    tipText: 'Mention art styles lIke "uklyo-e" or "Impressionist."',
    tipPrompt: "Teddy bears shopping for groceries in Japan, ukiyo-e",
  },
  {
    imgSrc: T6,
    tipText: "Ask for 3D renders.",
    tipPrompt: "3D render of a pink balloon dog in a violet room",
  },
  {
    imgSrc: T7,
    tipText: 'Add", digital art" for striking and high-quality images.',
    tipPrompt:
      "A cyberpunk illustration of the San Francisco Golden Gate Bridge, digital art",
  },
  {
    imgSrc: T8,
    tipText: "Ask for images in the style of your favorite artist.",
    tipPrompt: "A van Gogh style painting of an American football player",
  },
  {
    imgSrc: T9,
    tipText: "Describe the lighting to improve aesthetics.",
    tipPrompt:
      "A futuristic cyborg poster hanging in a neon lit subway station",
  },
  {
    imgSrc: T10,
    tipText: "Include a location as context for the image.",
    tipPrompt: "A photo of a teddy bear on a skateboard in Times Square",
  },
  {
    imgSrc: T11,
    tipText: "Combine interesting concepts.",
    tipPrompt:
      "An expressive oil painting of a basketball player dunking, depicted as an explosion of a nebula",
  },
  {
    imgSrc: T12,
    tipText: 'Mention styles like "synthwave" or "cyberpunk."',
    tipPrompt: "Synthwave sports car",
  },
  {
    imgSrc: T13,
    tipText:
      'Ask for contexts like "stained glass window" or "album art cover."',
    tipPrompt: "A stained glass window depicting a robot",
  },
  {
    imgSrc: T14,
    tipText: "Ask for abstract or implausible images.",
    tipPrompt:
      "A bowl of soup that is also a portal to another dimension, digital art",
  },
  {
    imgSrc: T15,
    tipText: 'A single word like "bright" or "dark" can have a big impact.',
    tipPrompt:
      "A pencil and watercolor drawing of a bright city in the future with flying cars",
  },
  {
    imgSrc: T16,
    tipText: 'Ask for mediums like "oil pastel" or "pencil and watercolor."',
    tipPrompt: "An oil pastel drawing of an annoyed cat in a spaceship",
  },
];

export const COLORS = [
  {
    name: "black",
    hex: "#000000",
  },
  {
    name: "white",
    hex: "#ffffff",
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const SURPRISE_ME_PROMPTS = [
  "an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background",
  "a cat submarine chimera, digital art",
  "a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art",
  "3D render of a small pink balloon dog in a light pink room",
  "an oil pastel drawing of an annoyed cat in a spaceship",
  "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
  '"a sea otter with a pearl earring" by Johannes Vermeer',
  "a pencil and watercolor drawing of a bright city in the future with flying cars",
  "panda mad scientist mixing sparkling chemicals, digital art",
  "a stained glass window depicting a hamburger and french fries",
  "a painting of a fox in the style of Starry Night",
  "a stained glass window depicting a robot",
  "an astronaut lounging in a tropical resort in space, pixel art",
  "a stern-looking owl dressed as a librarian, digital art",
  "an oil painting by Matisse of a humanoid robot playing chess",
  "a bowl of soup that looks like a monster, knitted out of wool",
  "an astronaut playing basketball with cats in space, digital art",
  "teddy bears shopping for groceries, one-line drawing",
  "an expressive oil painting of a basketball player dunking, depicted as an explosion of a nebula",
  "abstract pencil and watercolor art of a lonely robot holding a balloon",
  "an astronaut lounging in a tropical resort in space, vaporwave",
  "an armchair in the shape of an avocado",
  "crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper",
  "photograph of an astronaut riding a horse",
  "synthwave sports car",
  "a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers",
  "a fortune-telling shiba inu reading your fate in a giant hamburger, digital art",
  "teddy bears shopping for groceries in Japan, ukiyo-e",
];

export const CUSTOMER_IMAGES = [
  P1,
  P13,
  P3,
  P4,
  P5,
  P6,
  P7,
  P8,
  P9,
  P10,
  P11,
  P12,
  P2,
];

export const TSHIRT_COST = 40;
