import Oswald from "./Oswald/Oswald.ttf";
import Bebas from "./Bebas/BebasNeue-Regular.ttf";
//Open Sans
import OpenSan from "./OpenSans/OpenSans-Regular.ttf";
import OpenSanBold from "./OpenSans/OpenSans-Bold.ttf";
import OpenSanItalic from "./OpenSans/OpenSans-Italic.ttf";
import OpenSanItalicBold from "./OpenSans/OpenSans-BoldItalic.ttf";
//Roboto
import Roboto from "./Roboto/Roboto-Regular.ttf";
import RobotoBold from "./Roboto/Roboto-Bold.ttf";
import RobotoItalic from "./Roboto/Roboto-Italic.ttf";
import RobotoBoldItalic from "./Roboto/Roboto-BoldItalic.ttf";
//TimeRoman

import Time from "./Roman/Tinos-Regular.ttf";
import TimeBold from "./Roman/Tinos-Bold.ttf";
import TimeItalic from "./Roman/Tinos-Italic.ttf";
import TimeBoldItalic from "./Roman/Tinos-BoldItalic.ttf";
//Testing
export const Font_Roboto = Roboto;
export const Font_Oswald = Oswald;
export const Font_Bebas = Bebas;
export const Font_Open_San = OpenSan;
//Final Product
export const Font_Data = [
  {
    family: "Open Sans",
    fonts: [
      { src: OpenSan, fontWeight: "normal", fontStyle: "normal" },
      {
        src: OpenSanBold,
        fontWeight: "bold",
      },
      {
        src: OpenSanItalic,
        fontStyle: "italic",
      },
      {
        src: OpenSanItalicBold,
        fontStyle: "italic",
        fontWeight: "bold",
      },
    ],
  },
  {
    family: "Tinos",
    fonts: [
      { src: Time, fontWeight: "normal", fontStyle: "normal" },
      {
        src: TimeBold,
        fontWeight: "bold",
      },
      {
        src: TimeItalic,
        fontStyle: "italic",
      },
      {
        src: TimeBoldItalic,
        fontStyle: "italic",
        fontWeight: "bold",
      },
    ],
  },
  {
    family: "Roboto",
    fonts: [
      { src: Roboto, fontWeight: "normal", fontStyle: "normal" },
      {
        src: RobotoBold,
        fontWeight: "bold",
      },
      {
        src: RobotoItalic,
        fontStyle: "italic",
      },
      {
        src: RobotoBoldItalic,
        fontStyle: "italic",
        fontWeight: "bold",
      },
    ],
  },
  { family: "Oswald", src: Oswald },
];
