import type { Config } from "@react-router/dev/config"
import { client } from "./tina/__generated__/client"

const res = await client.queries.postConnection()

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    return [
      "/",
      "/posts",
      ...res.data.postConnection.edges!.map(
        (e) => `/${e!.node!.id.replace(/\.mdx?$/, "")}`
      ),
      "/404",
    ]
  },
} satisfies Config
