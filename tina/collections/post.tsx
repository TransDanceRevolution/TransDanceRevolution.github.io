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
    // filename: {
    //   slugify: ({ title }) => {
    //     return title.
    //   }
    // },
  },
}
