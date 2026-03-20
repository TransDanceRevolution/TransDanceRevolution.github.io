import Autoplay from "embla-carousel-autoplay"
import NaarmDescription from "~/components/home/NaarmDescription.mdx";
import GadigalDescription from "~/components/home/GadigalDescription.mdx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { slideshowImages } from "~/components/home/index";
import { Link, useLocation, type MetaFunction } from "react-router";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Trans Dance Revolution" },
    {
      name: "description",
      content: "Trans Dance Revolution Jam, from Naarm, Gadigal, to the world.",
    },
  ];
};

const places: { [k: string]: { Description: React.ComponentType, Content: React.ComponentType } } = {
  "Naarm": {
    Description: NaarmDescription,
    Content: () => <iframe className="w-full aspect-500/565 border shadow" src="https://www.instagram.com/p/DUzTTX_j_NK/embed/" scrolling="no" allowTransparency={true} />,
  },
  "Gadigal": {
    Description: GadigalDescription,
    Content: () => <img className="shadow border" src="/img/gadigal-graphic.png" />,
  },
} as const;

export default function Home() {
  const location = useLocation();
  const hashValue = React.useMemo(() => location.hash.length < 1 ? "" : location.hash.slice(1), [location]);
  const place = React.useMemo(() => hashValue in places ? hashValue : "Naarm", [hashValue]);
  return (
    <div className="flex flex-col min-h-[calc(100svh-64px)]">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          })
        ]}
      >
        <CarouselContent className="-ml-0">
          {
            slideshowImages.map((Image, i) => (
              <CarouselItem key={i} className="pl-0">
                <Image className="object-cover min-w-0 min-h-0 h-96 md:h-200 w-full" />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
        <div className="absolute bottom-0 w-full inset-x-0">
          <div className="max-w-7xl w-full mx-auto flex">
            <div>
              <h1 className="text-2xl bg-primary text-primary-foreground">
                Trans Dance Revolution
              </h1>
              <h2 className="bg-secondary text-secondary-foreground">
                from Naarm, Gadigal to the world
              </h2>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="flex items-center justify-center p-3 flex-1">
        <Tabs value={place} className={"max-w-md w-full"}>
          <TabsList className={"w-full"}>
            <div className="text-xs w-full pl-2">
              Where are you based?
            </div>
            {
              Object.keys(places).map((e) => <TabsTrigger value={e} key={e} render={<Link to={`/#${e}`}>{e}</Link>} />)
            }
          </TabsList>
          {
            Object.entries(places).map(([n, { Description, Content }]) => (
              <TabsContent id={n} value={n}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {n}
                    </CardTitle>
                    <CardDescription className="prose">
                      <Description />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Content />
                  </CardContent>
                </Card>
              </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </div>
  )
}
