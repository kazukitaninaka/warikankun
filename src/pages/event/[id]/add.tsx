import { CheckIcon } from '@chakra-ui/icons';
import {
  Text,
  Input,
  Select,
  Center,
  Button,
  Box,
  Divider,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EventName from '../../../components/EventName';
import {
  Payment_Participant_Insert_Input,
  useInsertPaymentMutation,
  useQueryParticipantsQuery,
} from '../../../generated/graphql';

const Add = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQueryParticipantsQuery({
    variables: { eventId: id },
  });
  const event = data?.events[0];

  const [name, setName] = useState<string>('');
  const [whoPaidId, setWhoPaidId] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<string>('');
  const [whoShouldNotPay, setWhoShouldNotPay] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [insertPayment] = useInsertPaymentMutation();

  const handleWhoShouldPay = (index: number, isChecked: boolean) => {
    if (!event) return;
    // checkされてればwhoShouldNotPayに追加、なければ削除
    if (!isChecked) {
      setWhoShouldNotPay((prev) => prev.filter((i) => i !== index));
    } else if (whoShouldNotPay.length < event.participants.length - 1) {
      // 全員がwhoShouldNotPayに含まれるケースを避ける
      setWhoShouldNotPay((prev) => [...prev, index]);
    }
  };

  const addPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!amount || !whoPaidId || !event) return;

    // whoShouldNotPayを元にmutateする形にwhoShouldPayを整形
    let whoShouldPay: Payment_Participant_Insert_Input[] = [];
    event.participants.forEach((participant, index) => {
      if (!whoShouldNotPay.includes(index)) {
        whoShouldPay.push({ participantId: participant.id });
      }
    });

    insertPayment({
      variables: {
        eventId: id,
        name,
        amount: +amount, // convert string to number
        whoPaidId,
        whoShouldPay,
      },
    }).then(() => {
      router.push({
        pathname: '/event/[id]',
        query: { id },
      });
    });
  };

  if (error) {
    <Text>エラーが発生しました。</Text>;
  }

  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="large" mb="5">
        支払い情報
      </Text>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <form onSubmit={addPayment}>
          <Text mb="1" mt="3">
            支払い名
          </Text>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text mb="1" mt="3">
            支払った人
          </Text>
          <Select
            value={whoPaidId}
            required
            onChange={(e) => {
              setWhoPaidId(+e.target.value);
            }}
            placeholder="支払った人を選択"
          >
            {event?.participants?.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </Select>
          <Text mb="1" mt="3">
            金額
          </Text>
          <Input
            required
            value={amount}
            type="text"
            inputMode="numeric"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Text mb="1" mt="3">
            割り勘対象者
          </Text>
          <Box border="1px" borderColor="gray.200" borderRadius="md">
            {event?.participants?.map((participant, index) => {
              const isChecked = !whoShouldNotPay.includes(index);
              return (
                <Box
                  key={participant.id}
                  onClick={() => handleWhoShouldPay(index, isChecked)}
                  cursor="pointer"
                >
                  <Flex p="2">
                    <Box w="8%">
                      {isChecked && <CheckIcon color="blue.500" />}
                    </Box>
                    {participant.name}
                  </Flex>
                  {index !== event.participants.length - 1 && <Divider />}
                </Box>
              );
            })}
          </Box>
          <Center mt="5">
            <Button
              bgColor="blue.500"
              color="white"
              type="submit"
              isLoading={isSubmitting}
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
