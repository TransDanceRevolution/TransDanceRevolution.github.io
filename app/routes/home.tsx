import Autoplay from "embla-carousel-autoplay"
import NaarmDescription from "~/components/home/NaarmDescription.mdx";
import GadigalDescription from "~/components/home/GadigalDescription.mdx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
              <CarouselItem key={e} className="pl-0">
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
        <Tabs defaultValue="naarm" className={"max-w-md w-full"}>
          <TabsList>
            <TabsTrigger value="naarm">Naarm</TabsTrigger>
            <TabsTrigger value="gadigal">Gadigal</TabsTrigger>
          </TabsList>
          <TabsContent value="naarm">
            <Card>
              <CardHeader>
                <CardTitle>
                  Naarm
                </CardTitle>
                <CardDescription className="prose">
                  <NaarmDescription />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <iframe className="w-full aspect-500/565 border shadow" src="https://www.instagram.com/p/DUzTTX_j_NK/embed/" scrolling="no" allowTransparency={true} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gadigal">
            <Card>
              <CardHeader>
                <CardTitle>
                  Gadigal
                </CardTitle>
                <CardDescription className="prose">
                  <GadigalDescription />
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
                <iframe className="w-full aspect-500/565 border shadow" src="https://www.instagram.com/p/DUzTTX_j_NK/embed/" scrolling="no" allowTransparency={true} />
              </CardContent> */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
