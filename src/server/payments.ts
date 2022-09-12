import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Int,
  Float,
  Query,
  Arg,
  FieldResolver,
  Root,
  Mutation,
  InputType,
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

  @Field(() => Participant!)
  whoPaid!: Participant;

  @Field(() => [Participant!]!)
  whoShouldPay!: Participant[];

  @Field(() => Int!)
  amount!: number;

  @Field(() => ID!)
  eventId!: string;

  @Field(() => Date!)
  createdAt!: Date;

  @Field(() => Date!)
  updatedAt!: Date;
}

@InputType()
export class WhoShouldPayInput {
  @Field(() => Int!)
  participantId!: number;

  @Field(() => Float!)
  ratio!: number;
}

@InputType()
export class AddPaymentInput {
  @Field(() => String!)
  name!: string;

  @Field(() => Int!)
  whoPaidId!: number;

  @Field(() => [WhoShouldPayInput!]!)
  whoShouldPay!: WhoShouldPayInput[];

  @Field(() => Int!)
  amount!: number;

  @Field(() => String!)
  eventId!: string;
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

  @Mutation(() => Payment)
  async addPayment(
    @Arg('input') addPaymentInput: AddPaymentInput,
  ): Promise<{ id: number }> {
    const payment = await prisma.payment.create({
      data: {
        eventId: addPaymentInput.eventId,
        whoPaidId: addPaymentInput.whoPaidId,
        amount: addPaymentInput.amount,
        name: addPaymentInput.name,
        whoShouldPay: {
          create: addPaymentInput.whoShouldPay,
        },
      },
    });

    return { id: payment.id };
  }

  @FieldResolver()
  async whoShouldPay(@Root() payment: Payment): Promise<Participant[]> {
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

  @FieldResolver()
  async whoPaid(@Root() payment: Payment): Promise<Participant> {
    const whoPaid = await prisma.participant.findUnique({
      where: {
        id: payment.whoPaidId,
      },
    });
    if (!whoPaid) throw new Error('whoPaid not found');
    return whoPaid;
  }
}
