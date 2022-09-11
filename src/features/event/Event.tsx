import { Text, Center, Flex, Button, Box } from '@chakra-ui/react';
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  useQueryEventNameQuery,
  usePaymentCountQuery,
} from '@generated/deprecatedGraphql';
import { liffVar } from '@components/LiffProvider';
import AddFriend from '@features/event/AddFriend';
import useFriendship from '@hooks/useFriendship';
import EventName from '@components/EventName';
import { useRouter } from 'next/router';
import SumPrice from '@components/SumPrice';
import Payments from '@features/event/Payments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import useDeleteModal from '@features/event/useDeleteModal';

const Event: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: eventNameData } = useQueryEventNameQuery({
    variables: { eventId: id },
  });
  const { data: paymentCountData } = usePaymentCountQuery({
    variables: { eventId: id },
  });
  const liff = liffVar();
  const { isFriend } = useFriendship();
  const { renderDeleteModal, openModal, setDeleteTarget } = useDeleteModal();

  const handleShareClick = () => {
    if (!liff?.isInClient() || !eventNameData?.events[0]) return;
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
      {renderDeleteModal()}
      <EventName id={id} />
      <Flex justifyContent="space-evenly" mt="3">
        <Button colorScheme="teal" onClick={() => router.push(`${id}/add`)}>
          <PlusSquareIcon mr="1" /> 支払いを追加
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => router.push(`${id}/calc`)}
          disabled={!paymentCountData?.payments_aggregate.aggregate?.count}
        >
          <CheckIcon mr="1" /> 現在の精算結果を表示
        </Button>
      </Flex>
      <Text fontSize="large" mt="8">
        今までの支払い情報
      </Text>
      <Box mt="2">
        <SumPrice id={id} />
      </Box>
      <Box mb="5">
        <Payments
          id={id}
          setDeleteTarget={setDeleteTarget}
          onOpen={openModal}
        />
      </Box>
      <Box mb="5">
        <Center>
          <Text fontSize="sm" mb="3">
            グループに共有すれば、みんなが見れて便利！
          </Text>
        </Center>
        <Center>
          <Button
            colorScheme="green"
            onClick={handleShareClick}
            disabled={!liff?.isInClient()}
          >
            <Box mr="1">
              <FontAwesomeIcon icon={faShareSquare} />
            </Box>
            LINEでグループに共有
          </Button>
        </Center>
      </Box>
      {!isFriend && (
        <Center>
          <AddFriend />
        </Center>
      )}
    </>
  );
};

export default Event;
