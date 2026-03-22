import type { Config } from "@react-router/dev/config"
import { init } from "react-router-mdx/server"
import { client } from "./tina/__generated__/client";

const things = await client.queries.postConnection();

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    return [
      "/",
      "/posts",
      ...things.data.postConnection.edges!.map((e) => `/${e!.node!.id.split(".", 2)[0]!}`),
    ]
  },
} satisfies Config
