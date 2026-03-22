import dancersAlleyImage from "./img/Digital-Screens-in-Tumbalong-Boulevard-1.png"
import moriartyWalk from "./img/ICC_Sydney_Convention_Centre_Moriarty_Walk_2017.jpg"
import imaxImage from "./img/IMAX_Melbourne_Museum.jpg"
import NaarmDescription from "./descriptions/naarm-description.mdx"
import GadigalDescription from "./descriptions/gadigal-description.mdx"
import NaarmJamLocation from "./descriptions/naarm-jam-location"
import { cn } from "~/lib/utils"

export const slideshowImages: React.FC<{ className: string }>[] = [
  ({ className }) => (
    <img
      alt="Dancers Alley Billboard"
      className={className}
      src={dancersAlleyImage}
    />
  ),
  ({ className }) => (
    <img alt="Dancers Alley" className={className} src={moriartyWalk} />
  ),
  ({ className }) => (
    <img alt="IMAX Melbourne" className={cn("object-[50%_85%]", className)} src={imaxImage} />
  ),
]

export const places: {
  [k: string]: {
    Description: React.ComponentType
    Content: React.ComponentType
  }
} = {
  Naarm: {
    Description: () => <>
      <NaarmDescription />
      {/* <NaarmJamLocation /> */}
    </>,
    Content: () => (
      <div className="border shadow pb-[calc(100%+52px)] relative">
        <iframe
          className="w-full h-full absolute inset-0"
          src="https://www.instagram.com/p/DWLam2LE82U/embed/"
          scrolling="no"
          loading="lazy"
        />
      </div>
    ),
  },
  Gadigal: {
    Description: GadigalDescription,
    Content: () => (
      <div className="border shadow pb-[calc(100%+52px)] relative">
        <iframe
          className="w-full h-full absolute inset-0"
          src="https://www.instagram.com/p/DWLam2LE82U/embed/"
          scrolling="no"
          loading="lazy"
        />
      </div>
    ),
  },
} as const;

export { default as About } from "./about.mdx"; 
export { default as GroundRules } from "./ground-rules.mdx"; 