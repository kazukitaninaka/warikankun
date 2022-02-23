import React, { useState, FC } from 'react';
import { Input, Text, Button, Box, Flex } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useInsertEventMutation } from '../generated/graphql';

const Create: FC = () => {
  const [participants, setParticipants] = useState<{ name: string }[]>([{ name: '' }]);
  const [eventName, setEventName] = useState<string>('');
  const [insertEvent, { loading: isInserting }] = useInsertEventMutation();

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: '' }]);
  };

  const setParticipantName = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onShare = () => {
    insertEvent({
      variables: {
        eventName,
        participants: participants.filter((participant) => participant.name), // nameが空のものは除く
      },
    });
    alert('success');
  };

  return (
    <div>
      <Text fontSize="lg" fontWeight="bold">
        新規割り勘イベント作成
      </Text>
      <Input
        placeholder="イベント名"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        mt="2"
      ></Input>
      <Text fontSize="lg" fontWeight="bold" mt="5">
        割り勘参加者
      </Text>
      {participants.map((participant, index) => (
        <Flex columnGap="3" alignItems="center" key={`participant-${index}`}>
          <Input
            placeholder="参加者名"
            value={participant.name}
            onChange={(e) => setParticipantName(index, e)}
            mt={2}
          />
          <CloseIcon mt="2" onClick={() => deleteParticipant(index)} />
        </Flex>
      ))}
      <Box textAlign="center">
        <Button mt="3" onClick={addParticipant}>
          参加者を追加
        </Button>
      </Box>
      <Box textAlign="center" mt="10">
        <Button bgColor="green.400" color="white" onClick={onShare}>
          {isInserting ? 'イベント作成中...' : 'グループに共有'}
        </Button>
      </Box>
    </div>
  );
};

export default Create;
