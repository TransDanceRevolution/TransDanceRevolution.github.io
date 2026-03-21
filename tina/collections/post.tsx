import type { Collection } from "tinacms";
export const Post: Collection = {
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
};