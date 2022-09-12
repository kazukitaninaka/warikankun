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
  Mutation,
  InputType,
} from 'type-graphql';
import { Payment } from './payments';
import { Participant } from './participants';
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
  sumPrice?: number;

  @Field(() => [Participant!])
  participants?: Participant[];
}
@InputType()
class ParticipantForEventInput {
  @Field(() => String!)
  name!: string;
}

@InputType()
class EventInput {
  @Field(() => String!)
  eventName!: string;

  @Field(() => [ParticipantForEventInput!])
  participants!: { name: string }[];
}

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return await prisma.event.findMany();
  }

  @Query(() => Event)
  async event(@Arg('eventId') eventId: string): Promise<Event | null> {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });
    return event;
  }

  @Mutation(() => Event)
  async createEvent(@Arg('input') eventInput: EventInput): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        name: eventInput.eventName,
      },
    });

    await prisma.participant.createMany({
      data: eventInput.participants.map((participant) => ({
        name: participant.name,
        eventId: event.id,
      })),
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

  @FieldResolver()
  async participants(@Root() event: Event): Promise<Participant[]> {
    return await prisma.participant.findMany({
      where: {
        eventId: event.id,
      },
    });
  }

  @FieldResolver()
  async sumPrice(@Root() event: Event): Promise<number> {
    const payments = await prisma.payment.findMany({
      where: {
        eventId: event.id,
      },
    });
    const sum = payments.reduce((acc, payment) => acc + payment.amount, 0);
    return sum;
  }
}
