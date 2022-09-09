import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import 'reflect-metadata';
import {
  EventResolver,
  PaymentResolver,
  ParticipantResolver,
} from 'src/server';
import { buildSchema } from 'type-graphql';

const schema = await buildSchema({
  resolvers: [EventResolver, PaymentResolver, ParticipantResolver],
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}
