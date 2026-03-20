import dancersAlleyImage from "./img/Digital-Screens-in-Tumbalong-Boulevard-1.png"
import moriartyWalk from "./img/ICC_Sydney_Convention_Centre_Moriarty_Walk_2017.jpg"
import imaxImage from "./img/IMAX_Melbourne_Museum.jpg"
import NaarmDescription from "./descriptions/naarm-description.mdx"
import GadigalDescription from "./descriptions/gadigal-description.mdx"

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
    <img alt="IMAX Melbourne" className={className} src={imaxImage} />
  ),
]

export const places: {
  [k: string]: {
    Description: React.ComponentType
    Content: React.ComponentType
  }
} = {
  Naarm: {
    Description: NaarmDescription,
    Content: () => (
      <iframe
        className="aspect-500/565 w-full border shadow"
        src="https://www.instagram.com/p/DUzTTX_j_NK/embed/"
        scrolling="no"
      />
    ),
  },
  Gadigal: {
    Description: GadigalDescription,
    Content: () => (
      <img
        alt="TDR Gadigal Graphic"
        className="border shadow"
        src="/img/gadigal-graphic.png"
      />
    ),
  },
} as const
