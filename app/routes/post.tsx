import remarkGfm from "remark-gfm";
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import { useMdxComponent, useMdxAttributes } from 'react-router-mdx/client'
import type { Route } from "./+types/post";
import { videoExtensions } from "~/lib/consts";

function MdxImg(props: React.ComponentProps<"img">) {
    const extension = (props.src ?? "").split(".", 2).at(1)?.toLowerCase();
    
    if (extension != null && videoExtensions.includes(extension)) {
        return (
            <video
                controls
                preload="metadata"
                className="w-full"
                title={props.alt}
            >
                <source src={props.src} type={`video/${extension}`} />
                Your browser does not support the video tag.
            </video>
        );
    }

    return <img {...props} />;
}

export async function loader({ request }: Route.LoaderArgs) {
    const { loadMdx } = await import("react-router-mdx/server");
    return loadMdx(
        request,
        {
            remarkPlugins: [
                remarkGfm,
                [remarkEmbedder, { transformers: [oembedTransformer] }],
            ],
        },
    );
}

export default function Route() {
    const Component = useMdxComponent({ img: MdxImg })
    const attributes = useMdxAttributes()

    return <section className='flex items-center justify-center w-full p-3'>
        <div className='prose max-w-7xl'>
            <h1><mark className='bg-primary text-primary-foreground'>{attributes.title}</mark></h1>
            <Component />
        </div>
    </section>;

}