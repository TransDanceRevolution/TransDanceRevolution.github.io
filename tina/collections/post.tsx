import htmlElements from "./html-elements.json";
console.log(htmlElements);
import type { Collection } from "tinacms"
export const Post: Collection = {
  name: "post",
  label: "Posts",
  path: "posts",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Created At",
      required: true,
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      description: "Tags for this post",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [
        {
          name: "video",
          label: "Video",
          ui: {
            defaultItem: {
              src: "",
              width: "100%",
              height: undefined,
              controls: true,
            },
          },
          fields: [
            {
              name: "src",
              label: "Source",
              type: "image",
              required: true,
            },
            {
              name: "width",
              label: "Width",
              type: "string",
            },
            {
              name: "height",
              label: "Height",
              type: "string",
            },
            {
              name: "controls",
              label: "Enable Controls",
              type: "boolean",
            },
          ],
        },
        {
          name: "iframe",
          label: "iFrame",
          fields: [
            ...(
              [
                ...Object.keys(htmlElements.iframe.attributes),
                ...Object.keys(htmlElements["*"].attributes)
              ]
                .filter((e) => !e.includes("-"))
                .map((e) => ({ name: e, type: "string" } as any))
            ),
          ],
        },
      ],
    },
    {
      type: "boolean",
      name: "unlisted",
      label: "Unlisted",
    },
  ],
  ui: {
    allowedActions: {
      createNestedFolder: false,
      createFolder: false,
    },
    router: ({ document }) => `/posts/${document._sys.filename}`,
    filename: {
      slugify: ({ title }) => {
        return (title ?? "")
          .toLowerCase() // Convert to lowercase
          .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
          .replace(/^-+|-+$/g, "")
      },
    },
    // filename: {
    //   slugify: ({ title }) => {
    //     return title.
    //   }
    // },
  },
}
