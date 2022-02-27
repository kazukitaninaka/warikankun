import {
  Spinner,
  Text,
  Center,
  Flex,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQueryEventByIdQuery } from '../../../generated/graphql';
import { formatNumberToJPY } from '../../../utils';

const Event = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQueryEventByIdQuery({
    variables: { eventId: id },
  });

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

  const event = data?.events[0];
  const sumPrice = event?.payments_aggregate.aggregate?.sum?.amount;

  return (
    <div>
      <Text fontSize="large">イベント名：{event?.name}</Text>
      <Flex justifyContent="space-evenly" mt="3">
        <Button
          bgColor="green.500"
          color="white"
          onClick={() => router.push(`${id}/add`)}
        >
          支払いを追加
        </Button>
        <Button
          bgColor="blue.500"
          color="white"
          onClick={() => router.push(`${id}/calc`)}
        >
          精算
        </Button>
      </Flex>
      <Text fontSize="large" mt="8">
        今までの支払い情報
      </Text>
      <Text mt="2">支払い総額：{formatNumberToJPY(sumPrice!)}</Text>

      {event?.payments.map((payment) => (
        <Table
          variant="simple"
          bgColor="white"
          borderRadius="md"
          key={payment.id}
          shadow="base"
          my="3"
        >
          <Tbody>
            <Tr>
              <Td>支払い名</Td>
              <Td>{payment.name}</Td>
            </Tr>
            <Tr>
              <Td>支払った人</Td>
              <Td>{payment.whoPaid.name}</Td>
            </Tr>
            <Tr>
              <Td>金額</Td>
              <Td>{formatNumberToJPY(payment.amount)}</Td>
            </Tr>
            <Tr>
              <Td>割り勘対象</Td>
              <Td>
                {payment.whoShouldPay.map((_) => (
                  <span key={_.participant.id}>{_.participant.name}　</span>
                ))}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      ))}
    </div>
  );
};

export default Event;
