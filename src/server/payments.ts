import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Int,
  Query,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import prisma from 'prisma/prisma';
import { Participant } from './participants';

@ObjectType()
export class Payment {
  @Field(() => Int!)
  id!: number;

  @Field(() => String!)
  name!: string;

  @Field(() => Int!)
  whoPaidId!: number;

  @Field(() => Int!)
  amount!: number;

  @Field(() => ID!)
  eventId!: string;

  @Field(() => Date!)
  createdAt!: Date;

  @Field(() => Date!)
  updatedAt!: Date;

  @Field(() => [Participant], { nullable: true })
  whoShouldPay?: Participant[];
}

@Resolver(Payment)
export class PaymentResolver {
  @Query(() => [Payment])
  async payments(@Arg('eventId') eventId: string): Promise<Payment[]> {
    return await prisma.payment.findMany({
      where: {
        eventId,
      },
    });
  }

  @FieldResolver()
  async whoShouldPay(@Root() payment: Payment) {
    const participants = await prisma.paymentsOnParticipants.findMany({
      where: {
        paymentId: payment.id,
      },
    });
    const whoShouldPay = await prisma.participant.findMany({
      where: {
        OR: participants.map((participant) => ({
          id: participant.participantId,
        })),
      },
    });
    return whoShouldPay;
  }
}
