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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import EventName from '@components/EventName';
import {
  Payment_Participant_Insert_Input,
  useInsertPaymentMutation,
  useQueryParticipantsQuery,
} from '@generated/deprecatedGraphql';
import useAddPaymentDetails, {
  ratioEnum,
} from '@features/event/add/useAddPaymentDetails';

const Add: React.FC = () => {
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

  const handleRatioChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number,
  ) => {
    setDetails((prev) => {
      const newDetails = [...prev];
      newDetails[i].ratio = +e.target.value;
      return newDetails;
    });
  };

  const handleShouldPayChange = (i: number) => {
    setDetails((prev) => {
      const newDetails = [...prev];
      newDetails[i].shouldPay = !prev[i].shouldPay;
      return newDetails;
    });
  };

  const addPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!amount || !whoPaidId) return;

    const filteredDetails = details.filter(
      (participant) => participant.shouldPay,
    );

    const whoShouldPay: Payment_Participant_Insert_Input[] =
      filteredDetails.map((participant) => {
        return {
          participantId: participant.id,
          ratio: participant.ratio,
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
            <Text>ちょっと多め：通常の1.25倍の負担額</Text>
            <Text>ちょっと少なめ：通常の0.75倍の負担額</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  if (error) {
    <Text>エラーが発生しました。</Text>;
  }

  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="x-large" mb="5">
        支払い追加
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
            割り勘設定
          </Text>
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
                {details.map((participant, index) => {
                  return (
                    <Tr key={participant.id}>
                      <Td>
                        <Checkbox
                          size="lg"
                          onChange={() => handleShouldPayChange(index)}
                          isChecked={participant.shouldPay}
                        />
                      </Td>
                      <Td>{participant.name}</Td>
                      <Td>
                        <Select
                          onChange={(e) => handleRatioChange(e, index)}
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
