import { ObjectType, Field, ID, Resolver, Int, Query, Arg } from 'type-graphql';
import prisma from 'prisma/prisma';

@ObjectType()
export class Participant {
  @Field(() => Int!)
  id!: number;

  @Field(() => String!)
  name!: string;

  @Field(() => Date!)
  createdAt!: Date;

  @Field(() => Date!)
  updatedAt!: Date;

  @Field(() => String, { nullable: true })
  pictureUrl!: string | null;

  @Field(() => String, { nullable: true })
  participantId!: string | null;

  @Field(() => ID!)
  eventId!: string;

  @Field(() => String, { nullable: true })
  participant?: string;
}

@Resolver(Event)
export class ParticipantResolver {
  @Query(() => [Participant!])
  async participants(@Arg('eventId') eventId: string): Promise<Participant[]> {
    return await prisma.participant.findMany({
      where: {
        eventId,
      },
    });
  }
}
