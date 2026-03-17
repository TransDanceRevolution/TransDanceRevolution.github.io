import { type RouteConfig, index } from "@react-router/dev/routes"
import { routes } from 'react-router-mdx/server';
console.log(routes("routes/post.tsx"));

export default [
    index("routes/home.tsx"),
    ...routes("routes/post.tsx"),
] satisfies RouteConfig
