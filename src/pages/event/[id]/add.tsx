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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EventName from '../../../components/EventName';
import {
  Payment_Participant_Insert_Input,
  useInsertPaymentMutation,
  useQueryParticipantsQuery,
} from '../../../generated/graphql';
import useAddPaymentDetails from '../../../hooks/useAddPaymentDetails';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { details, setDetails } = useAddPaymentDetails(event);

  const [insertPayment] = useInsertPaymentMutation();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleAmountPerPersonChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    setDetails((prev) => {
      const newDetails = [...prev];
      newDetails[i].amount = e.target.value;
      return newDetails;
    });
  };

  const addPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!amount || !whoPaidId) return;

    // 負担調整済額の合計を算出

    const filteredDetails = details.filter(
      (participant) => participant.amount !== '0',
    );

    const sumOfCustomAmount = filteredDetails.reduce(
      (prev, curr) => {
        if (curr.amount === '') return prev;
        return {
          sumAmount: prev.sumAmount + Number(curr.amount),
          sumParticipants: prev.sumParticipants + 1,
        };
      },
      { sumAmount: 0, sumParticipants: 0 },
    );

    const whoShouldPay: Payment_Participant_Insert_Input[] =
      filteredDetails.map((participant) => {
        const amountForRest =
          (+amount - sumOfCustomAmount.sumAmount) /
          (filteredDetails.length - sumOfCustomAmount.sumParticipants);

        return {
          participantId: participant.id,
          amountPerPerson: participant.amount
            ? +participant.amount
            : amountForRest,
        };
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
      <Text textAlign="center" fontSize="x-large" mb="5">
        支払い情報
      </Text>
      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : (
        <form onSubmit={addPayment}>
          <Text fontSize="lg" mb="1" mt="4">
            支払い名
          </Text>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text fontSize="lg" mb="1" mt="4">
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
          <Text fontSize="lg" mb="1" mt="4">
            金額
          </Text>
          <Input
            required
            value={amount}
            type="text"
            inputMode="numeric"
            onChange={handleAmountChange}
          />
          <Text mb="1" mt="4" fontSize="lg">
            負担額調整
          </Text>
          <Text fontSize="sm" color="gray.600">
            一人当たりの負担額を個別に設定できます。
          </Text>
          <Text fontSize="sm" mb="1" color="gray.600">
            0を設定すればその人を割り勘対象から外すことができます。
          </Text>
          <Text fontSize="sm" mb="1" color="gray.600">
            空白にすれば残りの額で均等に割り勘されます。
          </Text>
          <Box border="1px" borderColor="gray.200" borderRadius="md">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>名前</Th>
                  <Th>
                    負担額(調整なしの場合、{Math.ceil(+amount / details.length)}
                    円/人)
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {details?.map((participant, index) => {
                  return (
                    <Tr key={participant.id}>
                      <Td>{participant.name}</Td>
                      <Td>
                        <Input
                          value={participant.amount}
                          type="text"
                          inputMode="numeric"
                          onChange={(e) =>
                            handleAmountPerPersonChange(e, index)
                          }
                          placeholder="残りの額で均等に割り勘"
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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
