module.exports = {
  schema: [
    {
      'https://warikankun.hasura.app/v1/graphql': {
        headers: {
          // TODO: ハードコードすればうまくいく
          'x-hasura-admin-secret':
            'kNRis2mNL5jGHMY6NXbR5PfjHItTXwefioWYR4pIu0QVlWuUp4nQX3mPaFhhmgiM',
        },
      },
    },
  ],
  documents: ['./src/graphql/*.gql'],
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
