import { useTina } from "tinacms/dist/react"
import type { Route } from "./+types/post"
import { isRouteErrorResponse, useLoaderData } from "react-router"
import PostSection from "~/components/post/post-section"

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
}: Route.ErrorBoundaryProps) {
  console.log("post error");
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>()
  const { data } = useTina(loaderData)

  return (
    <PostSection post={data.post} />
  )
}
