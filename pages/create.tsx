import React, { useState, FC } from "react";
import { Input, Text, Button, Box, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const initialMembers = [{ name: "" }];

const Create: FC = () => {
  const [participants, setParticipants] = useState(initialMembers);

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: "" }]);
  };

  const setParticipantName = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
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

  return (
    <div>
      <Text fontSize="lg" fontWeight="bold">
        新規割り勘イベント作成
      </Text>
      <Input placeholder="イベント名" mt="2"></Input>
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
        <Button bgColor="green.400" color="white">
          グループに共有
        </Button>
      </Box>
    </div>
  );
};

export default Create;
