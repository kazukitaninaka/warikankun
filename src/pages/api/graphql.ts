import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  EventResolver,
  PaymentResolver,
  ParticipantResolver,
} from 'src/server';
import { buildSchema } from 'type-graphql';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  origin: [
    'https://warikankun.vercel.app',
    'https://studio.apollographql.com',
    'https://warikankun-git-createapolloserver-kazukitaninaka.vercel.app/', // preview
    'http://localhost:3000',
  ],
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

const schema = await buildSchema({
  resolvers: [EventResolver, PaymentResolver, ParticipantResolver],
  emitSchemaFile: true,
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
  await runMiddleware(req, res, cors);
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}
