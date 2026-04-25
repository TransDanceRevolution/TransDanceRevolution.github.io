import { useTina } from "tinacms/dist/react"
import type { Route } from "./+types/posts.$slug"
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useLocation,
} from "react-router"
import PostSection from "~/components/post/post-section"
import { PostDocument } from "tina/__generated__/types"
import React from "react"
import { Button } from "~/components/ui/button"
import { PencilIcon } from "lucide-react"
import { cn } from "~/lib/utils"

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

export function ErrorBoundary({ error, params }: Route.ErrorBoundaryProps) {
  // options need to be memo'd for some reason to prevent excessive rerender.
  const query = React.useMemo(
    () =>
      ({
        data: { post: {} },
        query: PostDocument,
        variables: { relativePath: `${params.slug}.mdx` },
      }) satisfies Parameters<typeof useTina>[0],
    [params.slug]
  )
  const { data } = useTina(query)

  // only show preview if post section is correctly set
  if (Object.keys(data.post).length > 1) {
    return <PostSection post={data.post as any} />
  }

  // pass to parent boundary
  throw error;
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>()
  const location = useLocation()
  const { data } = useTina(loaderData)

  const [displayEdit, setDisplayEdit] = React.useState(false)

  React.useEffect(() => {
    // if on server or in iframe, skip this
    if (window == undefined || window.self !== window.top) {
      return
    }
    const storageCb = () => {
      const tinacmsAuth = window.localStorage.getItem("tinacms-auth")
      const tinacmsLocalLoggedIn = window.localStorage.getItem(
        "tina.local.isLogedIn"
      )
      if (
        (tinacmsAuth != null &&
          tinacmsAuth.length > 0 &&
          tinacmsAuth !== "null") ||
        tinacmsLocalLoggedIn === "true"
      ) {
        setDisplayEdit(true)
        return
      }
      setDisplayEdit(false)
    }
    storageCb()
    window.addEventListener("storage", storageCb)
    return () => window.removeEventListener("storage", storageCb)
  }, [])

  return (
    <>
      <PostSection post={data.post} />
      <div className={cn("fixed right-5 bottom-5", !displayEdit && "hidden")}>
        <Button
          size={"icon"}
          nativeButton={false}
          title="Edit Post"
          render={(props) => (
            <Link reloadDocument={true} to={`/admin/index.html#/~${location.pathname}`} {...props}>
              <PencilIcon />
            </Link>
          )}
        />
      </div>
    </>
  )
}
