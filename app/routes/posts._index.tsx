import React from "react"
import { Link, useLoaderData, type MetaFunction } from "react-router"
import { useTina } from "tinacms/react"
import { Badge } from "~/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { postTags } from "~/lib/consts"

export async function loader() {
  const { client } = await import("~/../tina/__generated__/client")
  return await client.queries.postConnection()
}

export const meta: MetaFunction = () => {
  return [
    { title: "Trans Dance Revolution Blog" },
    {
      name: "description",
      content:
        "Trans Dance Revolution Blog, from Naarm, Gadigal, to the world.",
    },
  ]
}

export default function Posts() {
  const loaderData = useLoaderData<typeof loader>()
  const { data } = useTina(loaderData)
  const [activatedTags, setActivatedTags] = React.useState(new Set<string>())
  const sortedNodes = React.useMemo(
    () =>
      (data.postConnection.edges ?? [])
        .flatMap((e) => (e?.node == null ? [] : e.node))
        .filter((e) => !e.unlisted)
        .filter((e) => {
          if (activatedTags.size === 0) {
            return true
          }
          let matchedTags = 0
          for (const tag of e.tags ?? []) {
            if (tag != null && activatedTags.has(tag)) {
              matchedTags++
            }
          }
          return matchedTags === activatedTags.size
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    [data.postConnection.edges, activatedTags]
  )
  return (
    <section className="mx-auto w-full max-w-7xl space-y-1">
      <div className="flex w-full gap-2 overflow-scroll">
        {[...postTags].map((e, i) => (
          <Badge
            key={i}
            render={(props) => (
              <button
                onClick={() => {
                  const newActivatedCategories = new Set(activatedTags)
                  if (newActivatedCategories.has(e)) {
                    newActivatedCategories.delete(e)
                  } else {
                    newActivatedCategories.add(e)
                  }
                  setActivatedTags(newActivatedCategories)
                }}
                {...props}
              >
                {e}
              </button>
            )}
            className="cursor-pointer transition-all"
            variant={activatedTags.has(e) ? "default" : "outline"}
          />
        ))}
      </div>
      <Table>
        <TableCaption>A list of blog posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-24">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedNodes.map((e) => (
            <TableRow key={e.id}>
              <TableCell>
                <Link
                  className="-m-2 block h-full w-full p-2 font-medium underline"
                  to={`/${e.id.split(".", 2)[0]}`}
                >
                  {e.title}
                </Link>
              </TableCell>
              <TableCell className="flex gap-1">
                {e.tags?.map((e) => (
                  <Badge key={e}>{e}</Badge>
                ))}
              </TableCell>
              <TableCell>{new Date(e.date).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
