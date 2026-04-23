import { TinaMarkdown } from "tinacms/dist/rich-text"
import { Badge } from "../ui/badge"
import { videoExtensions } from "~/lib/consts"
import type { PostQuery } from "~/../tina/__generated__/types"
import { cn, slugify } from "~/lib/utils"
import * as React from "react"
import { Link } from "react-router"
import { LinkIcon } from "lucide-react"

function MdxHeading({ children, type, _content_source, ...props }: any) {
  const id = React.useMemo(() => {
    if (
      children != null &&
      typeof children === "object" &&
      "props" in children &&
      "content" in children.props &&
      Array.isArray(children.props.content) &&
      children.props.content.length > 0 &&
      "type" in children.props.content[0] &&
      children.props.content[0].type === "text" &&
      typeof children.props.content[0].text === "string"
    ) {
      const textContent: string = children.props.content[0].text
      return slugify(textContent)
    }
  }, [children])
  const Heading = React.createElement(
    type,
    {
      ...props,
      className: "group scroll-m-16",
      id,
    },
    [
      ...[children].flatMap((e, i) => (
        <React.Fragment key={i + 1}>{e}</React.Fragment>
      )),
      id && (
        <Link
          key={0}
          to={`#${id}`}
          className="ml-1.5 inline-block align-middle opacity-0 transition-all group-hover:opacity-100"
          title={id}
        >
          <LinkIcon size={18} />
        </Link>
      ),
    ]
  )

  return Heading
}

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
  const extension = (pathname ?? "")
    .match(/(.*)\.(.*)$/)
    ?.at(-1)
    ?.toLowerCase()

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

function MdxVideo({ src, style, _content_source, ...props }: any) {
  const extension = ((src as string | undefined) ?? "")
    .match(/(.*)\.(.*)$/)
    ?.at(-1)
    ?.toLowerCase()
  const height = React.useMemo(() => {
    const h = props.height
    if (typeof h !== "string" || h.length === 0 || h.search(/\D/) !== -1) {
      return h
    }
    try {
      return Number.parseInt(h)
    } catch (_: any) {
      return h
    }
  }, [props])
  console.log(height)
  return (
    <video preload="metadata" style={{ ...style, height }} {...props}>
      <source src={src} type={`video/${extension}`} />
    </video>
  )
}

function MdxHtml({ value }: any) {
  return <div dangerouslySetInnerHTML={{ __html: value }} />
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
        <h1 className="group text-3xl">
          <mark className="bg-primary text-primary-foreground">
            {post.title}
          </mark>
          <Link
            to={"#"}
            className="ml-1.5 inline-block align-middle opacity-0 transition-all group-hover:opacity-100"
          >
            <LinkIcon size={18} />
          </Link>
        </h1>
        <div className="flex w-full gap-1 overflow-hidden">
          {post.tags?.map((e) => (
            <Badge key={e}>{e}</Badge>
          ))}
        </div>
        <div className="prose max-w-7xl prose-video:mx-auto">
          <TinaMarkdown
            components={{
              img: MdxImg,
              video: MdxVideo,
              h1: MdxHeading,
              h2: MdxHeading,
              h3: MdxHeading,
              h4: MdxHeading,
              h5: MdxHeading,
              h6: MdxHeading,
              html: MdxHtml,
            }}
            content={post.body}
          />
        </div>
      </div>
    </section>
  )
}
