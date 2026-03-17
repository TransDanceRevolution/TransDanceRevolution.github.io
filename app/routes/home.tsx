import Autoplay from "embla-carousel-autoplay"
import { Button } from "~/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { DotWave } from "~/components/ui/dot-wave";
import { homeImages } from "~/lib/consts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          })
        ]}
      >
        <CarouselContent className="-ml-0">
          {
            homeImages.map((e) => (
              <CarouselItem className="pl-0">
                <img className="object-cover min-w-0 min-h-0 h-96 md:h-200 w-full" src={e} />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
        <div className="absolute bottom-0 left-0">
          <h1 className="text-2xl bg-primary text-primary-foreground">
            Trans Dance Revolution
          </h1>
          <h2 className="bg-secondary text-secondary-foreground">
            from Naarm, Gadigal to the world
          </h2>
        </div>
      </Carousel>
      <div className="flex items-center justify-center p-3 flex-1">
        <iframe className="w-96 aspect-500/713 border shadow" src="https://www.instagram.com/p/DUzTTX_j_NK/embed/" scrolling="no" allowTransparency={true} />
      </div>
    </div>
  )
}
