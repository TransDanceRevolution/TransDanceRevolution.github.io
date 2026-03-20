import { type RouteConfig, index, route } from "@react-router/dev/routes"
import { routes } from "react-router-mdx/server"

const mdxRoutes = routes("routes/post.tsx")

export default [
  index("routes/home.tsx"),
  route("posts", "routes/posts.tsx"),
  ...mdxRoutes,
] satisfies RouteConfig
