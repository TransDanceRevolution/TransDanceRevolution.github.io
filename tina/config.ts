import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_REF_NAME ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.VITE_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "posts",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "posts",
        format: "mdx",
        ui: {
          allowedActions: {
            createNestedFolder: false,
            createFolder: false,
          }
        },
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
            name: 'date',
            label: 'Created At',
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            description: 'Tags for this post',
            list: true,
            required: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        // ui: {
        //   router: ({ document }) => `/posts/${document._sys.filename}`,
        // },
      },
      {
        name: "data",
        label: "Data",
        path: "app/components",
        format: "mdx",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
            createNestedFolder: false,
            createFolder: false,
          }
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      }
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_INDEXER_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
