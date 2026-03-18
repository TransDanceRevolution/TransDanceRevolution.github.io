import { type RouteConfig, index } from "@react-router/dev/routes";
import { routes } from "react-router-mdx/server";

const mdxRoutes = routes("routes/post.tsx")

export default [
    index("routes/home.tsx"),
    ...mdxRoutes,
] satisfies RouteConfig
