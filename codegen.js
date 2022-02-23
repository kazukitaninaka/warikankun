module.exports = {
  schema: [
    {
      "https://warikankun.hasura.app/v1/graphql": {
        headers: {
          // TODO: ハードコードすればうまくいく
          "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ["./graphql/*.graphql"],
  overwrite: true,
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
