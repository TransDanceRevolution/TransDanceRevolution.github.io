import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Route } from "./+types/post"
import { videoExtensions } from "~/lib/consts"
import { Badge } from "~/components/ui/badge"
import { useLoaderData } from "react-router"

function MdxImg(props: {
    url: string;
    caption?: string | undefined;
    alt?: string | undefined;
} | undefined) {
  const pathname = props?.url.replace(/^.*?:\/\/.*?\//, "");
  const extension = (pathname ?? "").split(".", 2).at(1)?.toLowerCase()

  if (extension != null && videoExtensions.includes(extension)) {
    return (
      <video controls preload="metadata" className="w-full" title={props?.alt}>
        <source src={props?.url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    )
  }

  return <img {...props} />
}

export async function loader({ params }: Route.LoaderArgs) {
  const { client } = await import("~/../tina/__generated__/client");
  const res = await client.queries.post({ relativePath: `${params.slug}.mdx` });
  return res;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const title = `${loaderData.data.post.title} - Trans Dance Revolution Blog`;
  return [
    { title },
    {
      name: "description",
      content:
        "Trans Dance Revolution Blog, from Naarm, Gadigal, to the world.",
    },
  ]
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>();
  const { data } = useTina(loaderData);

  return (
    <section className="flex w-full items-center justify-center p-3">
      <div className="max-w-7xl space-y-3">
        <h1 className="text-3xl">
          <mark className="bg-primary text-primary-foreground">
            {data.post.title}
          </mark>
        </h1>
        <div className="flex w-full gap-1 overflow-hidden">
          {data.post.tags.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
        <div className="prose max-w-7xl">
          <TinaMarkdown components={{ img: MdxImg }} content={data.post.body} />
        </div>
      </div>
    </section>
  )
}

