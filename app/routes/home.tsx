import Autoplay from "embla-carousel-autoplay"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { About, slideshowImages, places, GroundRules } from "~/components/home"
import { Link, useLocation, type MetaFunction } from "react-router"
import React from "react"

export const meta: MetaFunction = () => {
  return [
    { title: "Trans Dance Revolution" },
    {
      name: "description",
      content: "Trans Dance Revolution Jam, from Naarm, Gadigal, to the world.",
    },
  ]
}

export default function Home() {
  const location = useLocation()
  const hashValue = React.useMemo(
    () => (location.hash.length < 1 ? "" : location.hash.slice(1)),
    [location]
  )
  const place = React.useMemo(
    () => (hashValue in places ? hashValue : "Naarm"),
    [hashValue]
  )
  return (
    <div className="flex min-h-[calc(100svh-64px)] flex-col">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-0">
          {slideshowImages.map((Image, i) => (
            <CarouselItem key={i} className="pl-0">
              <Image className="h-96 min-h-0 w-full min-w-0 object-cover md:h-200" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="mx-auto flex w-full max-w-7xl px-3">
            <div>
              <h1 className="bg-primary text-2xl text-primary-foreground">
                Trans Dance Revolution
              </h1>
              <h2 className="bg-secondary text-secondary-foreground">
                from Naarm, Gadigal to the world
              </h2>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="flex md:flex-row flex-col items-center md:items-stretch p-3 w-full max-w-7xl mx-auto gap-3">
        <div className="w-full max-w-md md:max-w-full space-y-3">
        <Card className="flex">
          <CardHeader className="h-full">
            <CardTitle>Why?</CardTitle>
            <div className="flex items-center justify-center">
              <CardDescription className="prose max-w-full! lg:text-base">
                <About />
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card className="flex">
          <CardHeader className="h-full">
            <CardTitle>Ground Rules</CardTitle>
            <div className="flex items-center justify-center">
              <CardDescription className="prose max-w-full! lg:text-base">
                <GroundRules />
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        </div>
        <div className="w-full max-w-md">
          <Tabs value={place} className={"md:sticky top-18"}>
          <TabsList className={"w-full"}>
            <div className="w-full pl-2 text-xs">Interested? Where are you based?</div>
            {Object.keys(places).map((e) => (
              <TabsTrigger
                value={e}
                key={e}
                nativeButton={false}
                render={<Link to={`/#${e}`}>{e}</Link>}
              />
            ))}
          </TabsList>
          {Object.entries(places).map(([n, { Description, Content }]) => (
            <TabsContent key={n} id={n} value={n}>
              <Card>
                <CardHeader>
                  <CardTitle>{n}</CardTitle>
                  <CardDescription className="prose">
                    <Description />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Content />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        </div>
      </div>
    </div>
  )
}
