import {
  Text,
  Center,
  Flex,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useDeletePaymentMutation,
  useQueryEventNameQuery,
  useQueryPaymentsQuery,
} from '../../../generated/graphql';
import Modal from '../../../components/Modal';
import { useState } from 'react';
import { liffVar } from '../../../components/LiffProvider';
import AddWarikankun from '../../../components/AddFriend';
import useFriendship from '../../../hooks/useFriendship';
import EventName from '../../../components/EventName';
import { useRouter } from 'next/router';
import SumPrice from '../../../components/SumPrice';
import Payments from '../../../components/Payments';

const Event = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: eventNameData } = useQueryEventNameQuery({
    variables: { eventId: id },
  });
  const { data: paymentsData } = useQueryPaymentsQuery({
    variables: { eventId: id },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [Mutation, { loading: isDeleting, error: deleteError }] =
    useDeletePaymentMutation();
  const liff = liffVar();
  const { isFriend } = useFriendship();

  const deletePayment = () => {
    if (deleteTarget) {
      Mutation({ variables: { paymentId: deleteTarget } }).then(() => {
        onClose();
        router.reload();
      });
    }
  };

  const handleShareClick = () => {
    if (!liff || !eventNameData?.events[0]) return;
    if (liff.isApiAvailable('shareTargetPicker')) {
      const event = eventNameData?.events[0];
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
      <EventName id={id} />
      <Flex justifyContent="space-evenly" mt="3">
        <Button colorScheme="teal" onClick={() => router.push(`${id}/add`)}>
          支払いを追加
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => router.push(`${id}/calc`)}
          disabled={!paymentsData?.events[0].payments.length}
        >
          現在の精算結果を表示
        </Button>
      </Flex>
      <Text fontSize="large" mt="8">
        今までの支払い情報
      </Text>
      <Box mt="2">
        <SumPrice id={id} />
      </Box>
      <Box mb="5">
        <Payments id={id} setDeleteTarget={setDeleteTarget} onOpen={onOpen} />
      </Box>
      <Box mb="5">
        <Center>
          <Text fontSize="sm" mb="3">
            グループに共有すれば、みんなが見れて便利！
          </Text>
        </Center>
        <Center>
          <Button colorScheme="green" onClick={handleShareClick}>
            このページをグループに共有
          </Button>
        </Center>
      </Box>
      {!isFriend && (
        <Center>
          <AddWarikankun />
        </Center>
      )}
    </>
  );
};

export default Event;
