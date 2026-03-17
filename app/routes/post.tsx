import { useMdxComponent, useMdxAttributes } from 'react-router-mdx/client'
import { loadMdx, loadAllMdx } from 'react-router-mdx/server'
import type { Route } from "./+types/post";

export async function loader({ request }: Route.LoaderArgs) {
    return loadMdx(request);
}

export default function Route() {
    const Component = useMdxComponent()
    const attributes = useMdxAttributes()

    return <section>
        <h1>{attributes.title}</h1>
        <Component />
    </section>;

}