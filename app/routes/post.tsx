import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import { useMdxComponent, useMdxAttributes } from 'react-router-mdx/client'
import type { Route } from "./+types/post";

export async function loader({ request }: Route.LoaderArgs) {
    const { loadMdx } = await import("react-router-mdx/server");
    return loadMdx(
        request,
        {
            // remarkPlugins: [{
            //     plugins: [remarkEmbedder],
            //     settings: {
            //         hi: ""
            //     },
            // }],
        }
    );
}

export default function Route() {
    const Component = useMdxComponent()
    const attributes = useMdxAttributes()

    return <section className='flex items-center justify-center w-full p-3'>
        <div className='prose max-w-7xl'>
            <h1><mark className='bg-primary text-primary-foreground'>{attributes.title}</mark></h1>
            <Component />
        </div>
    </section>;

}