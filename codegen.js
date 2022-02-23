module.exports = {
  schema: [
    {
      'https://warikankun.hasura.app/v1/graphql': {
        headers: {
          // TODO: ハードコードすればうまくいく
          'x-hasura-admin-secret':
            process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./src/graphql/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
