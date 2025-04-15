import { Playfair_Display, Noto_Sans_Javanese } from "next/font/google";

export const PlayfairDisplayFont = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});

export const ShipporiMinchoFont = Noto_Sans_Javanese({
  weight: "400",
  subsets: ["javanese"],
});
