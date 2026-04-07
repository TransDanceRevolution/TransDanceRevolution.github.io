import { useTina } from "tinacms/dist/react"
import type { Route } from "./+types/post"
import { isRouteErrorResponse, useLoaderData } from "react-router"
import PostSection from "~/components/post/post-section"
import { PostDocument } from "tina/__generated__/types"

export async function loader({ params }: Route.LoaderArgs) {
  const { client } = await import("~/../tina/__generated__/client")
  const res = await client.queries.post({ relativePath: `${params.slug}.mdx` })
  return res
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const title = `${loaderData?.data.post.title ?? "Unknown"} - Trans Dance Revolution Blog`
  return [
    { title },
    {
      name: "description",
      content:
        "Trans Dance Revolution Blog, from Naarm, Gadigal, to the world.",
    },
  ]
}

export function ErrorBoundary({
  error,
  params
}: Route.ErrorBoundaryProps) {
  const { data } = useTina({
    data: { post: null as any },
    query: PostDocument,
    variables: { relativePath: `${params.slug}.mdx` }
  });
  if (data.post != null) {
    return <PostSection post={data.post} />
  }

  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>()
  const { data } = useTina(loaderData)

  return (
    <PostSection post={data.post} />
  )
}
