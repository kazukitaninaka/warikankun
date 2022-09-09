import prisma from 'prisma/prisma';
import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Query,
  Int,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Payment } from './payments';
@ObjectType()
export class Event {
  @Field(() => ID!)
  id!: string;

  @Field(() => String!)
  name!: string;

  @Field(() => Date!)
  createdAt!: Date;

  @Field(() => Date!)
  updatedAt!: Date;

  @Field(() => [Payment!])
  payments?: Payment[];

  @Field(() => Int!)
  sumAmount?: number;
}

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return await prisma.event.findMany();
  }

  @Query(() => Event)
  async event(@Arg('eventId') eventId: string): Promise<any> {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    return event;
  }

  @FieldResolver()
  async payments(@Root() event: Event): Promise<Payment[]> {
    return await prisma.payment.findMany({
      where: {
        eventId: event.id,
      },
    });
  }
}
