import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

export type From = {
  __typename?: 'From';
  id: Scalars['Int'];
  name: Scalars['String'];
  shouldHavePaid: Scalars['Int'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type Result = {
  __typename?: 'Result';
  id: Scalars['uuid'];
  name: Scalars['String'];
  sumPrice: Scalars['Int'];
  transactions: Array<Transaction>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type To = {
  __typename?: 'To';
  amount: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  from: From;
  to: Array<To>;
};

/** warikan events */
export type Events = {
  __typename?: 'events';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** fetch data from the table: "participants" */
  participants: Array<Participants>;
  /** fetch aggregated fields from the table: "participants" */
  participants_aggregate: Participants_Aggregate;
  /** fetch data from the table: "payments" */
  payments: Array<Payments>;
  /** fetch aggregated fields from the table: "payments" */
  payments_aggregate: Payments_Aggregate;
  updatedAt: Scalars['timestamptz'];
};


/** warikan events */
export type EventsParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


/** warikan events */
export type EventsParticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


/** warikan events */
export type EventsPaymentsArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};


/** warikan events */
export type EventsPayments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  participants?: InputMaybe<Participants_Bool_Exp>;
  payments?: InputMaybe<Payments_Bool_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsPkey = 'events_pkey'
}

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Participants_Arr_Rel_Insert_Input>;
  payments?: InputMaybe<Payments_Arr_Rel_Insert_Input>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  participants_aggregate?: InputMaybe<Participants_Aggregate_Order_By>;
  payments_aggregate?: InputMaybe<Payments_Aggregate_Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "participants" */
  delete_participants?: Maybe<Participants_Mutation_Response>;
  /** delete single row from the table: "participants" */
  delete_participants_by_pk?: Maybe<Participants>;
  /** delete data from the table: "payment_participant" */
  delete_payment_participant?: Maybe<Payment_Participant_Mutation_Response>;
  /** delete single row from the table: "payment_participant" */
  delete_payment_participant_by_pk?: Maybe<Payment_Participant>;
  /** delete data from the table: "payments" */
  delete_payments?: Maybe<Payments_Mutation_Response>;
  /** delete single row from the table: "payments" */
  delete_payments_by_pk?: Maybe<Payments>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "participants" */
  insert_participants?: Maybe<Participants_Mutation_Response>;
  /** insert a single row into the table: "participants" */
  insert_participants_one?: Maybe<Participants>;
  /** insert data into the table: "payment_participant" */
  insert_payment_participant?: Maybe<Payment_Participant_Mutation_Response>;
  /** insert a single row into the table: "payment_participant" */
  insert_payment_participant_one?: Maybe<Payment_Participant>;
  /** insert data into the table: "payments" */
  insert_payments?: Maybe<Payments_Mutation_Response>;
  /** insert a single row into the table: "payments" */
  insert_payments_one?: Maybe<Payments>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update data of the table: "participants" */
  update_participants?: Maybe<Participants_Mutation_Response>;
  /** update single row of the table: "participants" */
  update_participants_by_pk?: Maybe<Participants>;
  /** update data of the table: "payment_participant" */
  update_payment_participant?: Maybe<Payment_Participant_Mutation_Response>;
  /** update single row of the table: "payment_participant" */
  update_payment_participant_by_pk?: Maybe<Payment_Participant>;
  /** update data of the table: "payments" */
  update_payments?: Maybe<Payments_Mutation_Response>;
  /** update single row of the table: "payments" */
  update_payments_by_pk?: Maybe<Payments>;
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ParticipantsArgs = {
  where: Participants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Participants_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Payment_ParticipantArgs = {
  where: Payment_Participant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payment_Participant_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PaymentsArgs = {
  where: Payments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payments_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ParticipantsArgs = {
  objects: Array<Participants_Insert_Input>;
  on_conflict?: InputMaybe<Participants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Participants_OneArgs = {
  object: Participants_Insert_Input;
  on_conflict?: InputMaybe<Participants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_ParticipantArgs = {
  objects: Array<Payment_Participant_Insert_Input>;
  on_conflict?: InputMaybe<Payment_Participant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_Participant_OneArgs = {
  object: Payment_Participant_Insert_Input;
  on_conflict?: InputMaybe<Payment_Participant_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PaymentsArgs = {
  objects: Array<Payments_Insert_Input>;
  on_conflict?: InputMaybe<Payments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payments_OneArgs = {
  object: Payments_Insert_Input;
  on_conflict?: InputMaybe<Payments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ParticipantsArgs = {
  _inc?: InputMaybe<Participants_Inc_Input>;
  _set?: InputMaybe<Participants_Set_Input>;
  where: Participants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Participants_By_PkArgs = {
  _inc?: InputMaybe<Participants_Inc_Input>;
  _set?: InputMaybe<Participants_Set_Input>;
  pk_columns: Participants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_ParticipantArgs = {
  _inc?: InputMaybe<Payment_Participant_Inc_Input>;
  _set?: InputMaybe<Payment_Participant_Set_Input>;
  where: Payment_Participant_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_Participant_By_PkArgs = {
  _inc?: InputMaybe<Payment_Participant_Inc_Input>;
  _set?: InputMaybe<Payment_Participant_Set_Input>;
  pk_columns: Payment_Participant_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PaymentsArgs = {
  _inc?: InputMaybe<Payments_Inc_Input>;
  _set?: InputMaybe<Payments_Set_Input>;
  where: Payments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payments_By_PkArgs = {
  _inc?: InputMaybe<Payments_Inc_Input>;
  _set?: InputMaybe<Payments_Set_Input>;
  pk_columns: Payments_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** warikan participants */
export type Participants = {
  __typename?: 'participants';
  createdAt: Scalars['timestamptz'];
  eventId: Scalars['uuid'];
  id: Scalars['Int'];
  name: Scalars['String'];
  participantId?: Maybe<Scalars['String']>;
  /** An array relationship */
  payment_participants: Array<Payment_Participant>;
  /** An aggregate relationship */
  payment_participants_aggregate: Payment_Participant_Aggregate;
  pictureUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};


/** warikan participants */
export type ParticipantsPayment_ParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


/** warikan participants */
export type ParticipantsPayment_Participants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};

/** aggregated selection of "participants" */
export type Participants_Aggregate = {
  __typename?: 'participants_aggregate';
  aggregate?: Maybe<Participants_Aggregate_Fields>;
  nodes: Array<Participants>;
};

/** aggregate fields of "participants" */
export type Participants_Aggregate_Fields = {
  __typename?: 'participants_aggregate_fields';
  avg?: Maybe<Participants_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Participants_Max_Fields>;
  min?: Maybe<Participants_Min_Fields>;
  stddev?: Maybe<Participants_Stddev_Fields>;
  stddev_pop?: Maybe<Participants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Participants_Stddev_Samp_Fields>;
  sum?: Maybe<Participants_Sum_Fields>;
  var_pop?: Maybe<Participants_Var_Pop_Fields>;
  var_samp?: Maybe<Participants_Var_Samp_Fields>;
  variance?: Maybe<Participants_Variance_Fields>;
};


/** aggregate fields of "participants" */
export type Participants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Participants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "participants" */
export type Participants_Aggregate_Order_By = {
  avg?: InputMaybe<Participants_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Participants_Max_Order_By>;
  min?: InputMaybe<Participants_Min_Order_By>;
  stddev?: InputMaybe<Participants_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Participants_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Participants_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Participants_Sum_Order_By>;
  var_pop?: InputMaybe<Participants_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Participants_Var_Samp_Order_By>;
  variance?: InputMaybe<Participants_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "participants" */
export type Participants_Arr_Rel_Insert_Input = {
  data: Array<Participants_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Participants_On_Conflict>;
};

/** aggregate avg on columns */
export type Participants_Avg_Fields = {
  __typename?: 'participants_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "participants" */
export type Participants_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "participants". All fields are combined with a logical 'AND'. */
export type Participants_Bool_Exp = {
  _and?: InputMaybe<Array<Participants_Bool_Exp>>;
  _not?: InputMaybe<Participants_Bool_Exp>;
  _or?: InputMaybe<Array<Participants_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  eventId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  participantId?: InputMaybe<String_Comparison_Exp>;
  payment_participants?: InputMaybe<Payment_Participant_Bool_Exp>;
  pictureUrl?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "participants" */
export enum Participants_Constraint {
  /** unique or primary key constraint */
  ParticipantsPkey = 'participants_pkey'
}

/** input type for incrementing numeric columns in table "participants" */
export type Participants_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "participants" */
export type Participants_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  eventId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  participantId?: InputMaybe<Scalars['String']>;
  payment_participants?: InputMaybe<Payment_Participant_Arr_Rel_Insert_Input>;
  pictureUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Participants_Max_Fields = {
  __typename?: 'participants_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  eventId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  participantId?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "participants" */
export type Participants_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  pictureUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Participants_Min_Fields = {
  __typename?: 'participants_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  eventId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  participantId?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "participants" */
export type Participants_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  pictureUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "participants" */
export type Participants_Mutation_Response = {
  __typename?: 'participants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Participants>;
};

/** input type for inserting object relation for remote table "participants" */
export type Participants_Obj_Rel_Insert_Input = {
  data: Participants_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Participants_On_Conflict>;
};

/** on_conflict condition type for table "participants" */
export type Participants_On_Conflict = {
  constraint: Participants_Constraint;
  update_columns?: Array<Participants_Update_Column>;
  where?: InputMaybe<Participants_Bool_Exp>;
};

/** Ordering options when selecting data from "participants". */
export type Participants_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  payment_participants_aggregate?: InputMaybe<Payment_Participant_Aggregate_Order_By>;
  pictureUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: participants */
export type Participants_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "participants" */
export enum Participants_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ParticipantId = 'participantId',
  /** column name */
  PictureUrl = 'pictureUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "participants" */
export type Participants_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  eventId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  participantId?: InputMaybe<Scalars['String']>;
  pictureUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Participants_Stddev_Fields = {
  __typename?: 'participants_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "participants" */
export type Participants_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Participants_Stddev_Pop_Fields = {
  __typename?: 'participants_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "participants" */
export type Participants_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Participants_Stddev_Samp_Fields = {
  __typename?: 'participants_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "participants" */
export type Participants_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Participants_Sum_Fields = {
  __typename?: 'participants_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "participants" */
export type Participants_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "participants" */
export enum Participants_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ParticipantId = 'participantId',
  /** column name */
  PictureUrl = 'pictureUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Participants_Var_Pop_Fields = {
  __typename?: 'participants_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "participants" */
export type Participants_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Participants_Var_Samp_Fields = {
  __typename?: 'participants_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "participants" */
export type Participants_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Participants_Variance_Fields = {
  __typename?: 'participants_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "participants" */
export type Participants_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** join table of payment and participant on who_should_pay */
export type Payment_Participant = {
  __typename?: 'payment_participant';
  amountPerPerson?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  /** An object relationship */
  participant: Participants;
  participantId: Scalars['Int'];
  /** An object relationship */
  payment: Payments;
  paymentId: Scalars['Int'];
};

/** aggregated selection of "payment_participant" */
export type Payment_Participant_Aggregate = {
  __typename?: 'payment_participant_aggregate';
  aggregate?: Maybe<Payment_Participant_Aggregate_Fields>;
  nodes: Array<Payment_Participant>;
};

/** aggregate fields of "payment_participant" */
export type Payment_Participant_Aggregate_Fields = {
  __typename?: 'payment_participant_aggregate_fields';
  avg?: Maybe<Payment_Participant_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Payment_Participant_Max_Fields>;
  min?: Maybe<Payment_Participant_Min_Fields>;
  stddev?: Maybe<Payment_Participant_Stddev_Fields>;
  stddev_pop?: Maybe<Payment_Participant_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payment_Participant_Stddev_Samp_Fields>;
  sum?: Maybe<Payment_Participant_Sum_Fields>;
  var_pop?: Maybe<Payment_Participant_Var_Pop_Fields>;
  var_samp?: Maybe<Payment_Participant_Var_Samp_Fields>;
  variance?: Maybe<Payment_Participant_Variance_Fields>;
};


/** aggregate fields of "payment_participant" */
export type Payment_Participant_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payment_participant" */
export type Payment_Participant_Aggregate_Order_By = {
  avg?: InputMaybe<Payment_Participant_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Payment_Participant_Max_Order_By>;
  min?: InputMaybe<Payment_Participant_Min_Order_By>;
  stddev?: InputMaybe<Payment_Participant_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Payment_Participant_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Payment_Participant_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Payment_Participant_Sum_Order_By>;
  var_pop?: InputMaybe<Payment_Participant_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Payment_Participant_Var_Samp_Order_By>;
  variance?: InputMaybe<Payment_Participant_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment_participant" */
export type Payment_Participant_Arr_Rel_Insert_Input = {
  data: Array<Payment_Participant_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Payment_Participant_On_Conflict>;
};

/** aggregate avg on columns */
export type Payment_Participant_Avg_Fields = {
  __typename?: 'payment_participant_avg_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payment_participant" */
export type Payment_Participant_Avg_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payment_participant". All fields are combined with a logical 'AND'. */
export type Payment_Participant_Bool_Exp = {
  _and?: InputMaybe<Array<Payment_Participant_Bool_Exp>>;
  _not?: InputMaybe<Payment_Participant_Bool_Exp>;
  _or?: InputMaybe<Array<Payment_Participant_Bool_Exp>>;
  amountPerPerson?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  participant?: InputMaybe<Participants_Bool_Exp>;
  participantId?: InputMaybe<Int_Comparison_Exp>;
  payment?: InputMaybe<Payments_Bool_Exp>;
  paymentId?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "payment_participant" */
export enum Payment_Participant_Constraint {
  /** unique or primary key constraint */
  PaymentParticipantPaymentIdParticipantIdKey = 'payment_participant_payment_id_participant_id_key',
  /** unique or primary key constraint */
  PaymentParticipantPkey = 'payment_participant_pkey'
}

/** input type for incrementing numeric columns in table "payment_participant" */
export type Payment_Participant_Inc_Input = {
  amountPerPerson?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  participantId?: InputMaybe<Scalars['Int']>;
  paymentId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "payment_participant" */
export type Payment_Participant_Insert_Input = {
  amountPerPerson?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  participant?: InputMaybe<Participants_Obj_Rel_Insert_Input>;
  participantId?: InputMaybe<Scalars['Int']>;
  payment?: InputMaybe<Payments_Obj_Rel_Insert_Input>;
  paymentId?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Payment_Participant_Max_Fields = {
  __typename?: 'payment_participant_max_fields';
  amountPerPerson?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  participantId?: Maybe<Scalars['Int']>;
  paymentId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "payment_participant" */
export type Payment_Participant_Max_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Payment_Participant_Min_Fields = {
  __typename?: 'payment_participant_min_fields';
  amountPerPerson?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  participantId?: Maybe<Scalars['Int']>;
  paymentId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "payment_participant" */
export type Payment_Participant_Min_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "payment_participant" */
export type Payment_Participant_Mutation_Response = {
  __typename?: 'payment_participant_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payment_Participant>;
};

/** on_conflict condition type for table "payment_participant" */
export type Payment_Participant_On_Conflict = {
  constraint: Payment_Participant_Constraint;
  update_columns?: Array<Payment_Participant_Update_Column>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};

/** Ordering options when selecting data from "payment_participant". */
export type Payment_Participant_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participant?: InputMaybe<Participants_Order_By>;
  participantId?: InputMaybe<Order_By>;
  payment?: InputMaybe<Payments_Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: payment_participant */
export type Payment_Participant_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "payment_participant" */
export enum Payment_Participant_Select_Column {
  /** column name */
  AmountPerPerson = 'amountPerPerson',
  /** column name */
  Id = 'id',
  /** column name */
  ParticipantId = 'participantId',
  /** column name */
  PaymentId = 'paymentId'
}

/** input type for updating data in table "payment_participant" */
export type Payment_Participant_Set_Input = {
  amountPerPerson?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  participantId?: InputMaybe<Scalars['Int']>;
  paymentId?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Payment_Participant_Stddev_Fields = {
  __typename?: 'payment_participant_stddev_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payment_participant" */
export type Payment_Participant_Stddev_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payment_Participant_Stddev_Pop_Fields = {
  __typename?: 'payment_participant_stddev_pop_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payment_participant" */
export type Payment_Participant_Stddev_Pop_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payment_Participant_Stddev_Samp_Fields = {
  __typename?: 'payment_participant_stddev_samp_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payment_participant" */
export type Payment_Participant_Stddev_Samp_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Payment_Participant_Sum_Fields = {
  __typename?: 'payment_participant_sum_fields';
  amountPerPerson?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  participantId?: Maybe<Scalars['Int']>;
  paymentId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payment_participant" */
export type Payment_Participant_Sum_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** update columns of table "payment_participant" */
export enum Payment_Participant_Update_Column {
  /** column name */
  AmountPerPerson = 'amountPerPerson',
  /** column name */
  Id = 'id',
  /** column name */
  ParticipantId = 'participantId',
  /** column name */
  PaymentId = 'paymentId'
}

/** aggregate var_pop on columns */
export type Payment_Participant_Var_Pop_Fields = {
  __typename?: 'payment_participant_var_pop_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payment_participant" */
export type Payment_Participant_Var_Pop_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payment_Participant_Var_Samp_Fields = {
  __typename?: 'payment_participant_var_samp_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payment_participant" */
export type Payment_Participant_Var_Samp_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Payment_Participant_Variance_Fields = {
  __typename?: 'payment_participant_variance_fields';
  amountPerPerson?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  participantId?: Maybe<Scalars['Float']>;
  paymentId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payment_participant" */
export type Payment_Participant_Variance_Order_By = {
  amountPerPerson?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  participantId?: InputMaybe<Order_By>;
  paymentId?: InputMaybe<Order_By>;
};

/** payments */
export type Payments = {
  __typename?: 'payments';
  amount: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  eventId: Scalars['uuid'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  whoPaid: Participants;
  whoPaidId: Scalars['Int'];
  /** An array relationship */
  whoShouldPay: Array<Payment_Participant>;
  /** An aggregate relationship */
  whoShouldPay_aggregate: Payment_Participant_Aggregate;
};


/** payments */
export type PaymentsWhoShouldPayArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


/** payments */
export type PaymentsWhoShouldPay_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};

/** aggregated selection of "payments" */
export type Payments_Aggregate = {
  __typename?: 'payments_aggregate';
  aggregate?: Maybe<Payments_Aggregate_Fields>;
  nodes: Array<Payments>;
};

/** aggregate fields of "payments" */
export type Payments_Aggregate_Fields = {
  __typename?: 'payments_aggregate_fields';
  avg?: Maybe<Payments_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Payments_Max_Fields>;
  min?: Maybe<Payments_Min_Fields>;
  stddev?: Maybe<Payments_Stddev_Fields>;
  stddev_pop?: Maybe<Payments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Payments_Stddev_Samp_Fields>;
  sum?: Maybe<Payments_Sum_Fields>;
  var_pop?: Maybe<Payments_Var_Pop_Fields>;
  var_samp?: Maybe<Payments_Var_Samp_Fields>;
  variance?: Maybe<Payments_Variance_Fields>;
};


/** aggregate fields of "payments" */
export type Payments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Payments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payments" */
export type Payments_Aggregate_Order_By = {
  avg?: InputMaybe<Payments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Payments_Max_Order_By>;
  min?: InputMaybe<Payments_Min_Order_By>;
  stddev?: InputMaybe<Payments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Payments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Payments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Payments_Sum_Order_By>;
  var_pop?: InputMaybe<Payments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Payments_Var_Samp_Order_By>;
  variance?: InputMaybe<Payments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payments" */
export type Payments_Arr_Rel_Insert_Input = {
  data: Array<Payments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Payments_On_Conflict>;
};

/** aggregate avg on columns */
export type Payments_Avg_Fields = {
  __typename?: 'payments_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payments" */
export type Payments_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payments". All fields are combined with a logical 'AND'. */
export type Payments_Bool_Exp = {
  _and?: InputMaybe<Array<Payments_Bool_Exp>>;
  _not?: InputMaybe<Payments_Bool_Exp>;
  _or?: InputMaybe<Array<Payments_Bool_Exp>>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  eventId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  whoPaid?: InputMaybe<Participants_Bool_Exp>;
  whoPaidId?: InputMaybe<Int_Comparison_Exp>;
  whoShouldPay?: InputMaybe<Payment_Participant_Bool_Exp>;
};

/** unique or primary key constraints on table "payments" */
export enum Payments_Constraint {
  /** unique or primary key constraint */
  PaymentsPkey = 'payments_pkey'
}

/** input type for incrementing numeric columns in table "payments" */
export type Payments_Inc_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  whoPaidId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "payments" */
export type Payments_Insert_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  eventId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  whoPaid?: InputMaybe<Participants_Obj_Rel_Insert_Input>;
  whoPaidId?: InputMaybe<Scalars['Int']>;
  whoShouldPay?: InputMaybe<Payment_Participant_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Payments_Max_Fields = {
  __typename?: 'payments_max_fields';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  eventId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  whoPaidId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "payments" */
export type Payments_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Payments_Min_Fields = {
  __typename?: 'payments_min_fields';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  eventId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  whoPaidId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "payments" */
export type Payments_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "payments" */
export type Payments_Mutation_Response = {
  __typename?: 'payments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payments>;
};

/** input type for inserting object relation for remote table "payments" */
export type Payments_Obj_Rel_Insert_Input = {
  data: Payments_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Payments_On_Conflict>;
};

/** on_conflict condition type for table "payments" */
export type Payments_On_Conflict = {
  constraint: Payments_Constraint;
  update_columns?: Array<Payments_Update_Column>;
  where?: InputMaybe<Payments_Bool_Exp>;
};

/** Ordering options when selecting data from "payments". */
export type Payments_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  eventId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  whoPaid?: InputMaybe<Participants_Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
  whoShouldPay_aggregate?: InputMaybe<Payment_Participant_Aggregate_Order_By>;
};

/** primary key columns input for table: payments */
export type Payments_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "payments" */
export enum Payments_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WhoPaidId = 'whoPaidId'
}

/** input type for updating data in table "payments" */
export type Payments_Set_Input = {
  amount?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  eventId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  whoPaidId?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Payments_Stddev_Fields = {
  __typename?: 'payments_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payments" */
export type Payments_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payments_Stddev_Pop_Fields = {
  __typename?: 'payments_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payments" */
export type Payments_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payments_Stddev_Samp_Fields = {
  __typename?: 'payments_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payments" */
export type Payments_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Payments_Sum_Fields = {
  __typename?: 'payments_sum_fields';
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  whoPaidId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "payments" */
export type Payments_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** update columns of table "payments" */
export enum Payments_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  WhoPaidId = 'whoPaidId'
}

/** aggregate var_pop on columns */
export type Payments_Var_Pop_Fields = {
  __typename?: 'payments_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payments" */
export type Payments_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payments_Var_Samp_Fields = {
  __typename?: 'payments_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payments" */
export type Payments_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Payments_Variance_Fields = {
  __typename?: 'payments_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  whoPaidId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payments" */
export type Payments_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  whoPaidId?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** query result (transactions) */
  QueryResult: Result;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "participants" */
  participants: Array<Participants>;
  /** fetch aggregated fields from the table: "participants" */
  participants_aggregate: Participants_Aggregate;
  /** fetch data from the table: "participants" using primary key columns */
  participants_by_pk?: Maybe<Participants>;
  /** fetch data from the table: "payment_participant" */
  payment_participant: Array<Payment_Participant>;
  /** fetch aggregated fields from the table: "payment_participant" */
  payment_participant_aggregate: Payment_Participant_Aggregate;
  /** fetch data from the table: "payment_participant" using primary key columns */
  payment_participant_by_pk?: Maybe<Payment_Participant>;
  /** fetch data from the table: "payments" */
  payments: Array<Payments>;
  /** fetch aggregated fields from the table: "payments" */
  payments_aggregate: Payments_Aggregate;
  /** fetch data from the table: "payments" using primary key columns */
  payments_by_pk?: Maybe<Payments>;
};


export type Query_RootQueryResultArgs = {
  eventId: Scalars['uuid'];
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


export type Query_RootParticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


export type Query_RootParticipants_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPayment_ParticipantArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


export type Query_RootPayment_Participant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


export type Query_RootPayment_Participant_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPaymentsArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};


export type Query_RootPayments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};


export type Query_RootPayments_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "participants" */
  participants: Array<Participants>;
  /** fetch aggregated fields from the table: "participants" */
  participants_aggregate: Participants_Aggregate;
  /** fetch data from the table: "participants" using primary key columns */
  participants_by_pk?: Maybe<Participants>;
  /** fetch data from the table: "payment_participant" */
  payment_participant: Array<Payment_Participant>;
  /** fetch aggregated fields from the table: "payment_participant" */
  payment_participant_aggregate: Payment_Participant_Aggregate;
  /** fetch data from the table: "payment_participant" using primary key columns */
  payment_participant_by_pk?: Maybe<Payment_Participant>;
  /** fetch data from the table: "payments" */
  payments: Array<Payments>;
  /** fetch aggregated fields from the table: "payments" */
  payments_aggregate: Payments_Aggregate;
  /** fetch data from the table: "payments" using primary key columns */
  payments_by_pk?: Maybe<Payments>;
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootParticipantsArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


export type Subscription_RootParticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Participants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Participants_Order_By>>;
  where?: InputMaybe<Participants_Bool_Exp>;
};


export type Subscription_RootParticipants_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPayment_ParticipantArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


export type Subscription_RootPayment_Participant_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payment_Participant_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payment_Participant_Order_By>>;
  where?: InputMaybe<Payment_Participant_Bool_Exp>;
};


export type Subscription_RootPayment_Participant_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPaymentsArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};


export type Subscription_RootPayments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Payments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Payments_Order_By>>;
  where?: InputMaybe<Payments_Bool_Exp>;
};


export type Subscription_RootPayments_By_PkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type DeletePaymentMutationVariables = Exact<{
  paymentId: Scalars['Int'];
}>;


export type DeletePaymentMutation = { __typename?: 'mutation_root', delete_payments_by_pk?: { __typename?: 'payments', id: number } | null };

export type InsertEventMutationVariables = Exact<{
  eventName: Scalars['String'];
  participants: Array<Participants_Insert_Input> | Participants_Insert_Input;
}>;


export type InsertEventMutation = { __typename?: 'mutation_root', insert_events_one?: { __typename?: 'events', id: any, name: string, participants: Array<{ __typename?: 'participants', id: number, name: string }> } | null };

export type InsertPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  eventId: Scalars['uuid'];
  name: Scalars['String'];
  whoPaidId: Scalars['Int'];
  whoShouldPay: Array<Payment_Participant_Insert_Input> | Payment_Participant_Insert_Input;
}>;


export type InsertPaymentMutation = { __typename?: 'mutation_root', insert_payments_one?: { __typename?: 'payments', id: number } | null };

export type QueryEventByIdQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QueryEventByIdQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, name: string, payments: Array<{ __typename?: 'payments', id: number, name: string, amount: number, createdAt: any, whoShouldPay: Array<{ __typename?: 'payment_participant', participant: { __typename?: 'participants', id: number, name: string } }>, whoPaid: { __typename?: 'participants', id: number, name: string } }>, payments_aggregate: { __typename?: 'payments_aggregate', aggregate?: { __typename?: 'payments_aggregate_fields', sum?: { __typename?: 'payments_sum_fields', amount?: number | null } | null } | null } }> };

export type QueryEventForAddQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QueryEventForAddQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, name: string, participants: Array<{ __typename?: 'participants', id: number, name: string }> }> };

export type QueryEventNameQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QueryEventNameQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, name: string }> };

export type QueryParticipantsQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QueryParticipantsQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, participants: Array<{ __typename?: 'participants', id: number, name: string }> }> };

export type QueryPaymentsQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QueryPaymentsQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, payments: Array<{ __typename?: 'payments', id: number, name: string, amount: number, createdAt: any, whoShouldPay: Array<{ __typename?: 'payment_participant', participant: { __typename?: 'participants', id: number, name: string } }>, whoPaid: { __typename?: 'participants', id: number, name: string } }> }> };

export type ResultQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type ResultQuery = { __typename?: 'query_root', QueryResult: { __typename?: 'Result', id: any, name: string, sumPrice: number, transactions: Array<{ __typename?: 'Transaction', from: { __typename?: 'From', id: number, name: string, shouldHavePaid: number }, to: Array<{ __typename?: 'To', amount: number, name: string, participantId: number }> }> } };

export type QuerySumPriceQueryVariables = Exact<{
  eventId: Scalars['uuid'];
}>;


export type QuerySumPriceQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: any, payments_aggregate: { __typename?: 'payments_aggregate', aggregate?: { __typename?: 'payments_aggregate_fields', sum?: { __typename?: 'payments_sum_fields', amount?: number | null } | null } | null } }> };


export const DeletePaymentDocument = gql`
    mutation deletePayment($paymentId: Int!) {
  delete_payments_by_pk(id: $paymentId) {
    id
  }
}
    `;
export type DeletePaymentMutationFn = Apollo.MutationFunction<DeletePaymentMutation, DeletePaymentMutationVariables>;

/**
 * __useDeletePaymentMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMutation, { data, loading, error }] = useDeletePaymentMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useDeletePaymentMutation(baseOptions?: Apollo.MutationHookOptions<DeletePaymentMutation, DeletePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePaymentMutation, DeletePaymentMutationVariables>(DeletePaymentDocument, options);
      }
export type DeletePaymentMutationHookResult = ReturnType<typeof useDeletePaymentMutation>;
export type DeletePaymentMutationResult = Apollo.MutationResult<DeletePaymentMutation>;
export type DeletePaymentMutationOptions = Apollo.BaseMutationOptions<DeletePaymentMutation, DeletePaymentMutationVariables>;
export const InsertEventDocument = gql`
    mutation insertEvent($eventName: String!, $participants: [participants_insert_input!]!) {
  insert_events_one(
    object: {name: $eventName, participants: {data: $participants}}
  ) {
    id
    name
    participants {
      id
      name
    }
  }
}
    `;
export type InsertEventMutationFn = Apollo.MutationFunction<InsertEventMutation, InsertEventMutationVariables>;

/**
 * __useInsertEventMutation__
 *
 * To run a mutation, you first call `useInsertEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertEventMutation, { data, loading, error }] = useInsertEventMutation({
 *   variables: {
 *      eventName: // value for 'eventName'
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useInsertEventMutation(baseOptions?: Apollo.MutationHookOptions<InsertEventMutation, InsertEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertEventMutation, InsertEventMutationVariables>(InsertEventDocument, options);
      }
export type InsertEventMutationHookResult = ReturnType<typeof useInsertEventMutation>;
export type InsertEventMutationResult = Apollo.MutationResult<InsertEventMutation>;
export type InsertEventMutationOptions = Apollo.BaseMutationOptions<InsertEventMutation, InsertEventMutationVariables>;
export const InsertPaymentDocument = gql`
    mutation insertPayment($amount: Int!, $eventId: uuid!, $name: String!, $whoPaidId: Int!, $whoShouldPay: [payment_participant_insert_input!]!) {
  insert_payments_one(
    object: {amount: $amount, eventId: $eventId, name: $name, whoPaidId: $whoPaidId, whoShouldPay: {data: $whoShouldPay}}
  ) {
    id
  }
}
    `;
export type InsertPaymentMutationFn = Apollo.MutationFunction<InsertPaymentMutation, InsertPaymentMutationVariables>;

/**
 * __useInsertPaymentMutation__
 *
 * To run a mutation, you first call `useInsertPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPaymentMutation, { data, loading, error }] = useInsertPaymentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      eventId: // value for 'eventId'
 *      name: // value for 'name'
 *      whoPaidId: // value for 'whoPaidId'
 *      whoShouldPay: // value for 'whoShouldPay'
 *   },
 * });
 */
export function useInsertPaymentMutation(baseOptions?: Apollo.MutationHookOptions<InsertPaymentMutation, InsertPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPaymentMutation, InsertPaymentMutationVariables>(InsertPaymentDocument, options);
      }
export type InsertPaymentMutationHookResult = ReturnType<typeof useInsertPaymentMutation>;
export type InsertPaymentMutationResult = Apollo.MutationResult<InsertPaymentMutation>;
export type InsertPaymentMutationOptions = Apollo.BaseMutationOptions<InsertPaymentMutation, InsertPaymentMutationVariables>;
export const QueryEventByIdDocument = gql`
    query queryEventById($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    name
    payments {
      id
      name
      amount
      createdAt
      whoShouldPay {
        participant {
          id
          name
        }
      }
      whoPaid {
        id
        name
      }
    }
    payments_aggregate {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
}
    `;

/**
 * __useQueryEventByIdQuery__
 *
 * To run a query within a React component, call `useQueryEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryEventByIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQueryEventByIdQuery(baseOptions: Apollo.QueryHookOptions<QueryEventByIdQuery, QueryEventByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryEventByIdQuery, QueryEventByIdQueryVariables>(QueryEventByIdDocument, options);
      }
export function useQueryEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryEventByIdQuery, QueryEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryEventByIdQuery, QueryEventByIdQueryVariables>(QueryEventByIdDocument, options);
        }
export type QueryEventByIdQueryHookResult = ReturnType<typeof useQueryEventByIdQuery>;
export type QueryEventByIdLazyQueryHookResult = ReturnType<typeof useQueryEventByIdLazyQuery>;
export type QueryEventByIdQueryResult = Apollo.QueryResult<QueryEventByIdQuery, QueryEventByIdQueryVariables>;
export const QueryEventForAddDocument = gql`
    query queryEventForAdd($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    name
    participants {
      id
      name
    }
  }
}
    `;

/**
 * __useQueryEventForAddQuery__
 *
 * To run a query within a React component, call `useQueryEventForAddQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryEventForAddQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryEventForAddQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQueryEventForAddQuery(baseOptions: Apollo.QueryHookOptions<QueryEventForAddQuery, QueryEventForAddQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryEventForAddQuery, QueryEventForAddQueryVariables>(QueryEventForAddDocument, options);
      }
export function useQueryEventForAddLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryEventForAddQuery, QueryEventForAddQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryEventForAddQuery, QueryEventForAddQueryVariables>(QueryEventForAddDocument, options);
        }
export type QueryEventForAddQueryHookResult = ReturnType<typeof useQueryEventForAddQuery>;
export type QueryEventForAddLazyQueryHookResult = ReturnType<typeof useQueryEventForAddLazyQuery>;
export type QueryEventForAddQueryResult = Apollo.QueryResult<QueryEventForAddQuery, QueryEventForAddQueryVariables>;
export const QueryEventNameDocument = gql`
    query queryEventName($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    name
  }
}
    `;

/**
 * __useQueryEventNameQuery__
 *
 * To run a query within a React component, call `useQueryEventNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryEventNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryEventNameQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQueryEventNameQuery(baseOptions: Apollo.QueryHookOptions<QueryEventNameQuery, QueryEventNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryEventNameQuery, QueryEventNameQueryVariables>(QueryEventNameDocument, options);
      }
export function useQueryEventNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryEventNameQuery, QueryEventNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryEventNameQuery, QueryEventNameQueryVariables>(QueryEventNameDocument, options);
        }
export type QueryEventNameQueryHookResult = ReturnType<typeof useQueryEventNameQuery>;
export type QueryEventNameLazyQueryHookResult = ReturnType<typeof useQueryEventNameLazyQuery>;
export type QueryEventNameQueryResult = Apollo.QueryResult<QueryEventNameQuery, QueryEventNameQueryVariables>;
export const QueryParticipantsDocument = gql`
    query queryParticipants($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    participants {
      id
      name
    }
  }
}
    `;

/**
 * __useQueryParticipantsQuery__
 *
 * To run a query within a React component, call `useQueryParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryParticipantsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQueryParticipantsQuery(baseOptions: Apollo.QueryHookOptions<QueryParticipantsQuery, QueryParticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryParticipantsQuery, QueryParticipantsQueryVariables>(QueryParticipantsDocument, options);
      }
export function useQueryParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryParticipantsQuery, QueryParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryParticipantsQuery, QueryParticipantsQueryVariables>(QueryParticipantsDocument, options);
        }
export type QueryParticipantsQueryHookResult = ReturnType<typeof useQueryParticipantsQuery>;
export type QueryParticipantsLazyQueryHookResult = ReturnType<typeof useQueryParticipantsLazyQuery>;
export type QueryParticipantsQueryResult = Apollo.QueryResult<QueryParticipantsQuery, QueryParticipantsQueryVariables>;
export const QueryPaymentsDocument = gql`
    query queryPayments($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    payments {
      id
      name
      amount
      createdAt
      whoShouldPay {
        participant {
          id
          name
        }
      }
      whoPaid {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useQueryPaymentsQuery__
 *
 * To run a query within a React component, call `useQueryPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryPaymentsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQueryPaymentsQuery(baseOptions: Apollo.QueryHookOptions<QueryPaymentsQuery, QueryPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryPaymentsQuery, QueryPaymentsQueryVariables>(QueryPaymentsDocument, options);
      }
export function useQueryPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryPaymentsQuery, QueryPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryPaymentsQuery, QueryPaymentsQueryVariables>(QueryPaymentsDocument, options);
        }
export type QueryPaymentsQueryHookResult = ReturnType<typeof useQueryPaymentsQuery>;
export type QueryPaymentsLazyQueryHookResult = ReturnType<typeof useQueryPaymentsLazyQuery>;
export type QueryPaymentsQueryResult = Apollo.QueryResult<QueryPaymentsQuery, QueryPaymentsQueryVariables>;
export const ResultDocument = gql`
    query Result($eventId: uuid!) {
  QueryResult(eventId: $eventId) {
    id
    name
    sumPrice
    transactions {
      from {
        id
        name
        shouldHavePaid
      }
      to {
        amount
        name
        participantId: id
      }
    }
  }
}
    `;

/**
 * __useResultQuery__
 *
 * To run a query within a React component, call `useResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useResultQuery(baseOptions: Apollo.QueryHookOptions<ResultQuery, ResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResultQuery, ResultQueryVariables>(ResultDocument, options);
      }
export function useResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResultQuery, ResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResultQuery, ResultQueryVariables>(ResultDocument, options);
        }
export type ResultQueryHookResult = ReturnType<typeof useResultQuery>;
export type ResultLazyQueryHookResult = ReturnType<typeof useResultLazyQuery>;
export type ResultQueryResult = Apollo.QueryResult<ResultQuery, ResultQueryVariables>;
export const QuerySumPriceDocument = gql`
    query querySumPrice($eventId: uuid!) {
  events(where: {id: {_eq: $eventId}}) {
    id
    payments_aggregate {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
}
    `;

/**
 * __useQuerySumPriceQuery__
 *
 * To run a query within a React component, call `useQuerySumPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuerySumPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuerySumPriceQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useQuerySumPriceQuery(baseOptions: Apollo.QueryHookOptions<QuerySumPriceQuery, QuerySumPriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuerySumPriceQuery, QuerySumPriceQueryVariables>(QuerySumPriceDocument, options);
      }
export function useQuerySumPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuerySumPriceQuery, QuerySumPriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuerySumPriceQuery, QuerySumPriceQueryVariables>(QuerySumPriceDocument, options);
        }
export type QuerySumPriceQueryHookResult = ReturnType<typeof useQuerySumPriceQuery>;
export type QuerySumPriceLazyQueryHookResult = ReturnType<typeof useQuerySumPriceLazyQuery>;
export type QuerySumPriceQueryResult = Apollo.QueryResult<QuerySumPriceQuery, QuerySumPriceQueryVariables>;