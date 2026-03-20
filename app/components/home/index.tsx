import dancersAlleyImage from "./img/Digital-Screens-in-Tumbalong-Boulevard-1.png"
import moriartyWalk from "./img/ICC_Sydney_Convention_Centre_Moriarty_Walk_2017.jpg"
import imaxImage from "./img/IMAX_Melbourne_Museum.jpg"
import NaarmDescription from "./NaarmDescription.mdx"
import GadigalDescription from "./GadigalDescription.mdx"

export const slideshowImages: React.FC<{ className: string }>[] = [
  (...props) => <img {...props} src={dancersAlleyImage} />,
  (...props) => <img {...props} src={moriartyWalk} />,
  (...props) => <img {...props} src={imaxImage} />,
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
        allowTransparency={true}
      />
    ),
  },
  Gadigal: {
    Description: GadigalDescription,
    Content: () => (
      <img className="border shadow" src="/img/gadigal-graphic.png" />
    ),
  },
} as const
