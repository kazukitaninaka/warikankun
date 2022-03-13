import { DeleteIcon } from '@chakra-ui/icons';
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
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  useDeletePaymentMutation,
  useQueryEventByIdQuery,
} from '../../../generated/graphql';
import { formatNumberToJPY } from '../../../utils';
import Modal from '../../../components/Modal';
import { useState } from 'react';
import useLiff from '../../../hooks/useLiff';

const Event = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQueryEventByIdQuery({
    variables: { eventId: id },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [Mutation, { loading: isDeleting, error: deleteError }] =
    useDeletePaymentMutation();
  const { liff } = useLiff();

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

  const deletePayment = () => {
    if (deleteTarget) {
      Mutation({ variables: { paymentId: deleteTarget } }).then(() => {
        onClose();
        router.reload();
      });
    }
  };

  const handleShareClick = () => {
    if (!liff || !event) return;
    if (liff.isApiAvailable('shareTargetPicker')) {
      liff.shareTargetPicker(
        [
          {
            type: 'text',
            text:
              `割り勘イベント「${event.name}」が作成されました！\n` +
              '以下のリンクから支払いを追加していきましょう！\n' +
              `https://liff.line.me/${process.env.NEXT_PUBLIC_LIFF_ID}/event/${event.id}\n` +
              '---------------\n' +
              '「割り勘くん」',
          },
        ],
        { isMultiple: true },
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={deletePayment}
        setDeleteTarget={setDeleteTarget}
        loading={isDeleting}
        error={deleteError}
      />
      <Text fontSize="large">イベント名：{event?.name}</Text>
      <Flex justifyContent="space-evenly" mt="3">
        <Button colorScheme="teal" onClick={() => router.push(`${id}/add`)}>
          支払いを追加
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => router.push(`${id}/calc`)}
          disabled={!event?.payments.length}
        >
          精算
        </Button>
      </Flex>
      <Text fontSize="large" mt="8">
        今までの支払い情報
      </Text>
      <Text mt="2">支払い総額：{formatNumberToJPY(sumPrice!)}</Text>
      <Box mb="10">
        {event?.payments.map((payment) => (
          <Box
            key={payment.id}
            borderRadius="md"
            shadow="base"
            my="3"
            bgColor="gray.50"
          >
            <Box textAlign="right">
              <DeleteIcon
                w={5}
                h={5}
                mt="3"
                mr="5"
                onClick={() => {
                  setDeleteTarget(payment.id);
                  onOpen();
                }}
              />
            </Box>
            <Table variant="simple">
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
          </Box>
        ))}
      </Box>
      <Center mb="3">
        <Button colorScheme="green" onClick={handleShareClick}>
          このページをグループに共有
        </Button>
      </Center>
      <Center>
        <Text fontSize="sm">グループに共有すれば、みんなが見れて便利！</Text>
      </Center>
    </>
  );
};

export default Event;
