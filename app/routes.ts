import { type RouteConfig, index, route } from "@react-router/dev/routes"
import { routes } from "react-router-mdx/server"

export default [
  index("routes/home.tsx"),
  route("posts", "routes/posts.tsx"),
  route("posts/:slug", "routes/post.tsx"),
  // ...mdxRoutes,
] satisfies RouteConfig
