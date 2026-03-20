declare module "mdx/types.js" {
  import type { JSX } from "react"
  export import JSX = JSX
}

declare module "*.mdx" {
  import type { ComponentType } from "react"

  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}
