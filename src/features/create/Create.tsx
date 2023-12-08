import React, { useContext, useMemo, useState } from 'react';
import {
  Input,
  Text,
  Button,
  Box,
  Flex,
  Center,
  FormLabel,
  FormControl,
  FormErrorMessage,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useCreateEventMutation } from '@generated/graphql';
import { LiffContext } from '@components/LiffProvider';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, useFieldArray, set } from 'react-hook-form';

interface CreateInput {
  eventName: string;
  participants: { name: string }[];
}

const Create: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateInput>({
    defaultValues: {
      eventName: '',
      participants: [{ name: '' }],
    },
  });
  const {
    fields: participantsFields,
    append: appendParticipant,
    remove,
  } = useFieldArray({
    control,
    name: 'participants',
    rules: {
      required: true,
      minLength: 2, // 参加者は2人以上
    },
  });
  const { mutate, isPending } = useCreateEventMutation();
  const liff = useContext(LiffContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [onSuccessRunning, setOnSuccessRunning] = useState(false);

  const onSubmit: SubmitHandler<CreateInput> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        setOnSuccessRunning(true);
        const id = data.createEvent.id;
        const name = data.createEvent.name;

        if (liff?.isInClient()) {
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
        } else {
          router.push(`/event/${id}`);
        }
      },
      onError: () => {
        setOnSuccessRunning(false);
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent,
      );
    if (isMobile && e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value !== '') {
        appendParticipant({ name: '' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage !== '' && (
        <Text fontSize="lg" color="red.500">
          {errorMessage}
        </Text>
      )}
      <FormControl isInvalid={errors.eventName !== undefined} mb="5">
        <FormLabel fontSize="lg" fontWeight="bold" mb="2" htmlFor="eventName">
          イベント名
        </FormLabel>
        <Input
          id="eventName"
          placeholder="イベント名"
          {...register('eventName', { required: true })}
          mb="1"
        ></Input>
        <FormErrorMessage color="red.500">
          {errors.eventName && 'イベント名を入力してください。'}
        </FormErrorMessage>
      </FormControl>
      <FormLabel fontSize="lg" fontWeight="bold" mb="2" htmlFor="participants">
        参加者
      </FormLabel>
      <FormControl isInvalid={errors.participants !== undefined} mb="10">
        <FormErrorMessage color="red.500" mb="1">
          {errors.participants?.root?.type === 'minLength' &&
            '参加者は2人以上設定してください。'}
        </FormErrorMessage>
        <UnorderedList marginInlineStart="0">
          {participantsFields.map((field, index) => (
            <ListItem key={field.id} listStyleType="none">
              <FormControl
                isInvalid={
                  errors.participants &&
                  errors.participants[index]?.name?.type === 'required'
                }
              >
                <Flex columnGap="3" alignItems="center">
                  <Input
                    placeholder="参加者名"
                    {...register(`participants.${index}.name`, {
                      required: true,
                    })}
                    autoFocus={index >= 1} // 初回レンダー、すなわちindex0の場合のみfocusしないように
                    mb="2"
                    onKeyDown={handleKeyDown}
                  />
                  {participantsFields.length > 1 && (
                    <CloseIcon mr="2" onClick={() => remove(index)} />
                  )}
                </Flex>
                <FormErrorMessage color="red.500" mb="1">
                  {errors.participants &&
                    errors.participants[index]?.name?.type === 'required' &&
                    '参加者名を設定してください'}
                </FormErrorMessage>
              </FormControl>
            </ListItem>
          ))}
        </UnorderedList>

        <Box textAlign="center" mt="3">
          <Button onClick={() => appendParticipant({ name: '' })}>
            参加者を追加
          </Button>
        </Box>
      </FormControl>

      <Center mb="3">
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isPending || onSuccessRunning}
          loadingText="作成中..."
        >
          イベント作成
        </Button>
      </Center>
    </form>
  );
};

export default Create;
