import htmlElements from "./html-elements.json"
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
              name: "loop",
              label: "Enable Looping",
              description:
                "If specified, the browser will automatically seek back to the start upon reaching the end of the video.",
              type: "boolean",
            },
            {
              name: "muted",
              label: "Enable Auto-Mute",
              description:
                "A Boolean attribute that indicates the default audio mute setting contained in the video. If set, the audio will be initially silenced.",
              type: "boolean",
            },
            {
              name: "controls",
              label: "Enable Controls",
              description:
                "If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.",
              type: "boolean",
            },
            {
              name: "autoplay",
              label: "Enable Autoplay",
              description:
                "Modern browsers may block audio (or videos with an unmuted audio track) from autoplaying, as sites that automatically play audio can be an unpleasant experience for users.",
              type: "boolean",
            },
          ],
        },
        // {
        //   name: "iframe",
        //   label: "iFrame",
        //   fields: [
        //     ...(
        //       [
        //         ...Object.keys(htmlElements.iframe.attributes),
        //         ...Object.keys(htmlElements["*"].attributes)
        //       ]
        //         .filter((e) => !e.includes("-"))
        //         .map((e) => ({ name: e, type: "string" } as any))
        //     ),
        //   ],
        // },
      ],
    },
    {
      type: "boolean",
      name: "unlisted",
      label: "Unlisted",
    },
  ],
  defaultItem: () => ({
    date: new Date(),
  }),
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
