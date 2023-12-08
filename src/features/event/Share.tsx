'use client';

import { Box, Center, Text, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LiffContext } from '@components/LiffProvider';
import { useGetEventNameQuery } from '@generated/graphql';

export default function Share({ id }: { id: string }) {
  const liff = useContext(LiffContext);
  const { data: eventNameData } = useGetEventNameQuery({
    eventId: id,
  });

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
    <Box>
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
  );
}
