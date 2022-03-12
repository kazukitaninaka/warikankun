import React, { useState, useRef } from 'react';
import { Input, Text, Button, Box, Flex, Center } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useInsertEventMutation } from '../generated/graphql';
import { NextPage } from 'next';
import useLiff from '../hooks/useLiff';

const Create: NextPage = () => {
  const [participants, setParticipants] = useState<{ name: string }[]>([
    { name: '' },
  ]);
  const [eventName, setEventName] = useState<string>('');
  const [isEventCreated, setIsEventCreated] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');
  const [insertEvent, { loading: isInserting }] = useInsertEventMutation();
  const { liff } = useLiff();

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: '' }]);
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
    insertEvent({
      variables: {
        eventName,
        participants: participants.filter((participant) => participant.name), // nameが空のものは除く
      },
    })
      .then((res) => {
        setIsEventCreated(true);
        setEventId(res.data?.insert_events_one?.id);
      })
      .catch(() => {
        throw new Error('Error: Could not create a new event.');
      });
  };

  const handleShareClick = () => {
    if (!liff) return;
    if (liff.isApiAvailable('shareTargetPicker')) {
      console.log('hoge');
      liff
        .shareTargetPicker(
          [
            {
              type: 'text',
              text: `割り勘イベント「${eventName}」が作成されました！\n以下のリンクから支払いを追加していきましょう！\n${process.env.NEXT_PUBLIC_DEV_LINK}/event/${eventId}`,
            },
          ],
          { isMultiple: true },
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div>
      <Text fontSize="lg" fontWeight="bold" mb="2">
        新規割り勘イベント作成
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
              autoFocus
              mb="2"
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
          disabled={isInserting || isEventCreated}
        >
          {isInserting
            ? 'イベント作成中...'
            : isEventCreated
            ? 'イベント作成完了'
            : 'イベント作成'}
        </Button>
      </Center>
      <Center mb="3">
        <Text>イベントを作成したらグループのみんなにリンクを共有しよう</Text>
      </Center>
      <Center>
        <Button
          colorScheme="green"
          onClick={handleShareClick}
          disabled={!isEventCreated}
        >
          LINEでグループに共有
        </Button>
      </Center>
    </div>
  );
};

export default Create;
