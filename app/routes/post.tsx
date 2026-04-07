import { useTina } from "tinacms/dist/react"
import type { Route } from "./+types/post"
import { useLoaderData } from "react-router"
import PostSection from "~/components/post/post-section"

export async function loader({ params }: Route.LoaderArgs) {
  const { client } = await import("~/../tina/__generated__/client")
  const res = await client.queries.post({ relativePath: `${params.slug}.mdx` })
  return res
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const title = `${loaderData.data.post.title} - Trans Dance Revolution Blog`
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
  const loaderData = useLoaderData<typeof loader>()
  const { data } = useTina(loaderData)

  return (
    <PostSection post={data.post} />
  )
}
