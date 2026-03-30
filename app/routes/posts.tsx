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
  const sortedEdges = React.useMemo(
    () =>
      (data.postConnection.edges ?? [])
        .flatMap((e) => (e?.node == null ? [] : e))
        .filter((e) => !e.node?.unlisted)
        .sort(
          (a, b) =>
            new Date(b.node!.date).getTime() - new Date(a.node!.date).getTime()
        ),
    [data.postConnection.edges]
  )
  return (
    <section className="mx-auto w-full max-w-7xl">
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
          {sortedEdges?.map((e) => {
            const node = e?.node
            if (node == null) return
            return (
              <TableRow key={node.id}>
                <TableCell>
                  <Link
                    className="-m-2 block h-full w-full p-2 font-medium underline"
                    to={`/${node.id.split(".", 2)[0]}`}
                  >
                    {node.title}
                  </Link>
                </TableCell>
                <TableCell className="flex gap-1">
                  {node.tags.map((e) => (
                    <Badge key={e}>{e}</Badge>
                  ))}
                </TableCell>
                <TableCell>{new Date(node.date).toDateString()}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
