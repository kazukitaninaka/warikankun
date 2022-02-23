import { CheckIcon } from '@chakra-ui/icons';
import {
  Text,
  Input,
  Select,
  Center,
  Spinner,
  Button,
  Box,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryEventForAddQuery } from '../../../generated/graphql';

const Add = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQueryEventForAddQuery({
    variables: { eventId: id },
  });
  const event = data?.events[0];

  const [whoPaidId, setWhoPaidId] = useState(event?.participants[0].id);
  const [whoShouldNotPay, setWhoShouldNotPay] = useState<number[]>([]);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Text>エラーが発生しました。時間を置いて再度アクセスしてください。</Text>
    );
  }

  const handleWhoShouldPay = (index: number, isInWhoShouldNotPay: boolean) => {
    // whoShouldNotPayにあったら削除、なかったら追加
    if (isInWhoShouldNotPay) {
      setWhoShouldNotPay((prev) => prev.filter((i) => i !== index));
    } else {
      setWhoShouldNotPay((prev) => [...prev, index]);
    }
  };

  return (
    <>
      <Text>イベント名：{event?.name}</Text>
      <Text textAlign="center" fontSize="large">
        支払い情報
      </Text>
      <Text mb="1" mt="3">
        名前
      </Text>
      <Input required />
      <Text mb="1" mt="3">
        支払った人
      </Text>
      <Select
        value={whoPaidId}
        onChange={(e) => {
          setWhoPaidId(+e.target.value);
        }}
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
      <Input type="number" required />
      <Text mb="1" mt="3">
        割り勘対象者
      </Text>
      <Box border="1px" borderColor="gray.200" borderRadius="md">
        {event?.participants?.map((participant, index) => {
          const isInWhoShouldNotPay = whoShouldNotPay.includes(index);
          return (
            <Box
              key={participant.id}
              onClick={() => handleWhoShouldPay(index, isInWhoShouldNotPay)}
              cursor="pointer"
            >
              <Flex p="2">
                <Box w="8%">
                  {!isInWhoShouldNotPay && <CheckIcon color="blue.500" />}
                </Box>
                {participant.name}
              </Flex>
              {index !== event.participants.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Box>
      <Center mt="5">
        <Button bgColor="blue.500" color="white">
          追加
        </Button>
      </Center>
    </>
  );
};

export default Add;
