import { ObjectType, Field, ID, Resolver, Query } from 'type-graphql';

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
}

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  events(): Event[] {
    return [
      {
        id: 'sdfgrwegthy',
        name: 'test name',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'sdfgrwegthydfghg',
        name: 'test name2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
