module.exports = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./src/graphql/*.gql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
          fetchParams: {
            headers: {
              'content-type': 'application/json',
            },
          },
        },
      },
    },
  },
};
