import type { Config } from "@react-router/dev/config";
import { init } from "react-router-mdx/server";

const mdx = init({ path: "posts" });

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  async prerender() {
    const paths = [
      "/",
      ...(await mdx.paths().then((e) => e.map((p) => `/${p}`)))
    ];
    return paths;
  },
} satisfies Config
