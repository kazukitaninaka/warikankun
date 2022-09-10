module.exports = {
  schema: [
    {
      'https://warikankun.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret':
            process.env.X_HASURA_ADMIN_SECRET_FOR_CODEGEN,
        },
      },
    },
  ],
  documents: ['./src/DEPRECATEDgraphql/*.gql'],
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
