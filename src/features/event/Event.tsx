import { Text, Center, Flex, Button, Box } from '@chakra-ui/react';
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useGetPaymentsQuery, useGetEventNameQuery } from '@generated/graphql';
import { LiffContext } from '@components/LiffProvider';
import AddFriend from '@features/event/AddFriend';
import useFriendship from '@hooks/useFriendship';
import EventName from '@components/EventName';
import { useRouter } from 'next/router';
import SumPrice from '@components/SumPrice';
import Payments from '@features/event/Payments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import useDeleteModal from '@features/event/useDeleteModal';
import { useContext } from 'react';

const Event: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { data: eventNameData } = useGetEventNameQuery({
    eventId: id,
  });
  const { data: paymentsData } = useGetPaymentsQuery({
    eventId: id,
  });
  const liff = useContext(LiffContext);
  const { isFriend } = useFriendship();
  const { renderDeleteModal, openModal, setDeleteTarget } = useDeleteModal();

  const handleShareClick = () => {
    if (!liff?.isInClient() || !eventNameData?.event) return;
    if (liff.isApiAvailable('shareTargetPicker')) {
      const event = eventNameData.event;
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
          disabled={!paymentsData?.payments.length}
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
