import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Badge } from "../ui/badge"
import { videoExtensions } from "~/lib/consts"
import type { PostQuery } from "~/../tina/__generated__/types"
import { cn } from "~/lib/utils"

function MdxImg(
  props:
    | {
        url: string
        caption?: string | undefined
        alt?: string | undefined
      }
    | undefined
) {
  const pathname = props?.url.replace(/^.*?:\/\/.*?\//, "")
  const extension = (pathname ?? "").split(".", 2).at(1)?.toLowerCase()

  if (extension != null && videoExtensions.includes(extension)) {
    return (
      <video controls preload="metadata" className="w-full" title={props?.alt}>
        <source src={props?.url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    )
  }

  return <img {...props} />
}

function MdxVideo({ src, ...props }: any) {
  const extension = (src ?? "").split(".", 2).at(1)?.toLowerCase()
  return (
    <video preload="metadata" {...props}>
      <source src={src} type={`video/${extension}`} />
    </video>
  )
}

export default function PostSection({
  className,
  post,
}: {
  className?: string
  post: PostQuery["post"]
}) {
  return (
    <section
      className={cn("flex w-full items-center justify-center p-3", className)}
    >
      <div className="w-full max-w-7xl space-y-3">
        <h1 className="text-3xl">
          <mark className="bg-primary text-primary-foreground">
            {post.title}
          </mark>
        </h1>
        <div className="flex w-full gap-1 overflow-hidden">
          {post.tags?.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
        <div className="prose max-w-7xl prose-video:mx-auto">
          <TinaMarkdown
            components={{ img: MdxImg, video: MdxVideo }}
            content={post.body}
          />
        </div>
      </div>
    </section>
  )
}
