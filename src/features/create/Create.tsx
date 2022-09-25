import React, { useContext, useMemo, useState } from 'react';
import { Input, Text, Button, Box, Flex, Center } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useCreateEventMutation } from '@generated/graphql';
import { LiffContext } from '@components/LiffProvider';
import { useRouter } from 'next/router';

const Create: React.FC = () => {
  const router = useRouter();
  const [participants, setParticipants] = useState<{ name: string }[]>([
    { name: '' },
  ]);
  const [eventName, setEventName] = useState<string>('');
  const createEventMutation = useCreateEventMutation();
  const liff = useContext(LiffContext);
  const isCreatingAllowed = useMemo(() => {
    const participantsWithNonEmptyName = participants.filter(
      (participant) => participant.name,
    );
    return eventName !== '' && participantsWithNonEmptyName.length >= 2;
  }, [eventName, participants]);

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: '' }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addParticipant();
    }
  };

  const setParticipantName = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setParticipants((prev) => {
      const newParticipants = [...prev];
      newParticipants[index] = { name: e.target.value };
      return newParticipants;
    });
  };

  const deleteParticipant = (index: number) => {
    setParticipants((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleCreateEventClick = () => {
    createEventMutation.mutate(
      {
        eventName,
        participants: participants.filter((participant) => participant.name), // nameが空のものは除く
      },
      {
        onSuccess: (data) => {
          const id = data.createEvent.id;
          const name = data.createEvent.name;

          if (!liff?.isInClient()) {
            router.push(`/event/${id}`);
            return;
          }

          liff
            ?.sendMessages([
              {
                type: 'text',
                text:
                  `割り勘イベント「${name}」が作成されました！\n` +
                  '以下のリンクから支払いを追加していきましょう！\n' +
                  `https://liff.line.me/${process.env.NEXT_PUBLIC_LIFF_ID}/event/${id}\n` +
                  '---------------\n' +
                  '割り勘くん',
              },
            ])
            .then(() => {
              liff.closeWindow();
            });
        },
      },
    );
  };

  return (
    <div>
      <Text fontSize="lg" fontWeight="bold" mb="2">
        新規割り勘イベント名
      </Text>
      <Input
        placeholder="イベント名"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        required
        mb="5"
      ></Input>
      <Text fontSize="lg" fontWeight="bold" mb="2">
        割り勘参加者
      </Text>
      <Box mb="3">
        {participants.map((participant, index) => (
          <Flex columnGap="3" alignItems="center" key={`participant-${index}`}>
            <Input
              placeholder="参加者名"
              value={participant.name}
              onChange={(e) => setParticipantName(index, e)}
              autoFocus={index >= 1} // 初回レンダー、すなわちindex0の場合のみfocusしないように
              mb="2"
              onKeyDown={handleKeyDown}
            />
            <CloseIcon mr="2" onClick={() => deleteParticipant(index)} />
          </Flex>
        ))}
      </Box>
      <Box textAlign="center" mb="10">
        <Button onClick={addParticipant}>参加者を追加</Button>
      </Box>
      <Center mb="3">
        <Button
          colorScheme="teal"
          onClick={handleCreateEventClick}
          disabled={!isCreatingAllowed || createEventMutation.isLoading}
        >
          {createEventMutation.isLoading ? 'イベント作成中...' : 'イベント作成'}
        </Button>
      </Center>
    </div>
  );
};

export default Create;
