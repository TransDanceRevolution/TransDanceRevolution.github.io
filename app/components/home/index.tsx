import dancersAlleyImage from "./img/Digital-Screens-in-Tumbalong-Boulevard-1.png"
import moriartyWalk from "./img/ICC_Sydney_Convention_Centre_Moriarty_Walk_2017.jpg"
import imaxImage from "./img/IMAX_Melbourne_Museum.jpg"
import NaarmDescription from "./descriptions/naarm-description.mdx"
import GadigalDescription from "./descriptions/gadigal-description.mdx"
// import NaarmJamLocation from "./descriptions/naarm-jam-location"
import { cn } from "~/lib/utils"

export const slideshowImages: {
  title: string
  render: React.FC<{ className: string; alt: string }>
}[] = [
  {
    title: "Dancers Alley, Sydney",
    render: (props) => <img src={dancersAlleyImage} {...props} />,
  },
  {
    title: "Dancers Alley, Sydney",
    render: (props) => <img src={moriartyWalk} {...props} />,
  },
  {
    title: "IMAX Theatre, Melbourne",
    render: ({ className, ...props }) => (
      <img
        className={cn("object-[50%_85%]", className)}
        src={imaxImage}
        {...props}
      />
    ),
  },
]

export const places: {
  [k: string]: {
    Description: React.ComponentType
    Content: React.ComponentType
  }
} = {
  Gadigal: {
    Description: GadigalDescription,
    Content: () => (
      <div className="relative border pb-[calc(100%+52px)] shadow">
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.instagram.com/p/DWLam2LE82U/embed/"
          scrolling="no"
          loading="lazy"
        />
      </div>
    ),
  },
  Naarm: {
    Description: () => (
      <>
        <NaarmDescription />
        {/* <NaarmJamLocation /> */}
      </>
    ),
    Content: () => (
      <div className="relative border pb-[calc(100%+52px)] shadow">
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.instagram.com/p/DUzTTX_j_NK/embed/"
          scrolling="no"
          loading="lazy"
        />
      </div>
    ),
  },
} as const

export { default as About } from "./about.mdx"
export { default as GroundRules } from "./ground-rules.mdx"
