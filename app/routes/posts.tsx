import React from "react";
import { Link } from "react-router";
import { useMdxFiles } from "react-router-mdx/client";
import { Badge } from "~/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export async function loader() {
    const { basename } = await import("node:path");
    const { loadAllMdx } = await import("react-router-mdx/server");
    const allMdx = await loadAllMdx();

    return allMdx.map((e) => ({ ...e, slug: `/posts/${basename(e.slug)}` }));
}

export default function Posts() {
    const mdxFiles = useMdxFiles();
    const sortedMdxFiles = React.useMemo(() => mdxFiles.sort((a, b) => (b.date as unknown as Date).getTime() - (a.date as unknown as Date).getTime()), mdxFiles);
    return <section className="max-w-7xl w-full mx-auto">
        <Table>
            <TableCaption>A list of blog posts.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-32">Tags</TableHead>
                    <TableHead className="w-24">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    sortedMdxFiles.map((e) => {
                        const date = e.date as unknown;
                        const tags = e.tags as unknown as string[] ?? [];
                        return (
                            <TableRow key={e.slug}>
                                <TableCell><Link className="w-full h-full block -m-2 p-2 font-medium underline" to={e.slug}>{e.title}</Link></TableCell>
                                <TableCell className="w-32 flex gap-1 overflow-scroll">{tags.map((e) => <Badge key={e}>{e}</Badge>)}</TableCell>
                                <TableCell>{(date) instanceof Date ? date.toDateString() : "undefined"}</TableCell>
                            </TableRow>
                        );
                    })
                }

            </TableBody>
        </Table>
    </section>
}