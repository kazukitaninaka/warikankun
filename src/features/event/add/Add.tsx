'use client';

import { InfoIcon } from '@chakra-ui/icons';
import {
  Text,
  Input,
  Select,
  Center,
  Button,
  Box,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import EventName from '@components/event-name/EventName';
import {
  useGetParticipantsQuery,
  useCreatePaymentMutation,
  WhoShouldPayInput,
} from '@generated/graphql';
import { useForm, SubmitHandler } from 'react-hook-form';

const ratioEnum = {
  ZERO: 0,
  LITTLE_LESS: 0.75,
  DEFAULT: 1,
  LITTLE_MORE: 1.25,
};

type Detail = {
  id: number;
  name: string;
  shouldPay: boolean;
  ratio: typeof ratioEnum[keyof typeof ratioEnum];
};

interface AddInput {
  name: string;
  whoPaidId: number | undefined;
  amount: string;
  details: Detail[];
}

const Add: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { isPending, isError, data } = useGetParticipantsQuery({
    eventId: id,
  });
  if (isError) {
    <Text>エラーが発生しました。</Text>;
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AddInput>({
    values: {
      name: '',
      whoPaidId: undefined,
      amount: '',
      details:
        data?.participants.map((participant) => {
          return {
            id: participant.id,
            name: participant.name,
            shouldPay: true,
            ratio: ratioEnum.DEFAULT,
          };
        }) || [],
    },
  });

  const createPaymentMutation = useCreatePaymentMutation();

  const onSubmit: SubmitHandler<AddInput> = (data) => {
    if (data.whoPaidId === undefined) return;

    const whoShouldPay: WhoShouldPayInput[] = data.details.map(
      (participant) => {
        return {
          participantId: participant.id,
          ratio: participant.shouldPay ? participant.ratio : ratioEnum.ZERO, // 割り勘対象でない場合は0
        };
      },
    );

    createPaymentMutation.mutate(
      {
        eventId: id,
        name: data.name,
        amount: +data.amount, // convert string to number
        whoPaidId: +data.whoPaidId, // convert string to number
        whoShouldPay,
      },
      {
        onSuccess: () => {
          router.push(`/event/${id}`);
        },
      },
    );
  };

  const hasNoOneToSplit =
    getValues().details.filter((detail) => detail.shouldPay).length < 1;

  const renderPopover = () => {
    return (
      <Popover placement="top-start">
        <PopoverTrigger>
          <InfoIcon />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text>ちょっと多め: 通常の1.25倍の負担額</Text>
            <Text>ちょっと少なめ: 通常の0.75倍の負担額</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="x-large" mb="5">
        支払い追加
      </Text>
      {isPending ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name !== undefined} mb="5">
            <FormLabel fontSize="lg" mb="1" htmlFor="name">
              支払い名
            </FormLabel>
            <Input id="name" {...register('name', { required: true })} />
            {errors.name && (
              <FormErrorMessage color="red.500" mt="1">
                支払い名を入力してください。
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.whoPaidId !== undefined} mb="5">
            <FormLabel fontSize="lg" mb="1" htmlFor="whoPaidId">
              支払った人
            </FormLabel>
            <Select
              id="whoPaidId"
              placeholder="支払った人を選択"
              {...register('whoPaidId', { required: true })}
            >
              {data?.participants?.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </Select>
            {errors.whoPaidId && (
              <FormErrorMessage color="red.500" mt="1">
                支払った人を選択してください。
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.amount !== undefined} mb="5">
            <FormLabel fontSize="lg" mb="1" htmlFor="amount">
              金額
            </FormLabel>
            <Input
              id="amount"
              type="text"
              inputMode="numeric"
              {...register('amount', { required: true })}
            />
            {errors.amount && (
              <FormErrorMessage color="red.500" mt="1">
                金額を入力してください。
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={hasNoOneToSplit} mb="5">
            <FormLabel mb="1" mt="4" fontSize="lg">
              割り勘設定
            </FormLabel>
            {hasNoOneToSplit && (
              <FormErrorMessage color="red.500" mt="1">
                割り勘対象がいません。
              </FormErrorMessage>
            )}
            <Box border="1px" borderColor="gray.200" borderRadius="md">
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>割り勘対象</Th>
                    <Th w="30%">名前</Th>
                    <Th w="50%">負担割合 {renderPopover()}</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {getValues().details.map((participant, index) => {
                    return (
                      <Tr key={participant.id}>
                        <Td>
                          <Checkbox
                            size="lg"
                            {...register(`details.${index}.shouldPay`, {
                              validate: () => {
                                return (
                                  getValues().details.filter(
                                    (detail) => detail.shouldPay,
                                  ).length >= 1
                                );
                              },
                            })}
                          />
                        </Td>
                        <Td>{participant.name}</Td>
                        <Td>
                          <Select
                            {...register(`details.${index}.ratio`)}
                            isInvalid={false} // shouldPayのinvalid時にエラーのスタイルが適用されてしまうため
                            size="sm"
                          >
                            <option value={ratioEnum.DEFAULT}>そのまま</option>
                            <option value={ratioEnum.LITTLE_LESS}>
                              ちょっと少なめ
                            </option>
                            <option value={ratioEnum.LITTLE_MORE}>
                              ちょっと多め
                            </option>
                          </Select>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </FormControl>
          <Center mt="5">
            <Button
              bgColor="blue.500"
              color="white"
              type="submit"
              isLoading={isSubmitting}
              loadingText="追加中"
            >
              追加
            </Button>
          </Center>
        </form>
      )}
    </>
  );
};

export default Add;
