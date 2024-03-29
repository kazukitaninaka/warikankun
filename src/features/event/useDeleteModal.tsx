'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useDeletePaymentMutation,
  useGetPaymentsQuery,
  useGetSumPriceQuery,
} from '@generated/graphql';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteModal = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, _setDeleteTarget] = useState<number | null>(null);
  const { isError, isPending, mutate } = useDeletePaymentMutation();
  const queryClient = useQueryClient();

  const deletePayment = () => {
    if (!deleteTarget) return;
    mutate(
      { paymentId: deleteTarget },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: useGetPaymentsQuery.getKey({ eventId: id }),
          });
          queryClient.invalidateQueries({
            queryKey: useGetSumPriceQuery.getKey({ eventId: id }),
          });
          onClose();
        },
      },
    );
  };

  const setDeleteTarget = (argument: number | null) => {
    _setDeleteTarget(argument);
  };

  const renderDeleteModal = () => (
    <Modal
      isOpen={isOpen}
      isCentered
      onClose={() => {
        setDeleteTarget(null);
        onClose();
      }}
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton p="2" />
        <ModalBody textAlign="center" mt="2">
          <Text>本当に削除しますか？</Text>
          {isError && <Text fontSize="lg">Error: 削除に失敗しました。</Text>}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mx="auto"
            onClick={deletePayment}
            disabled={isPending}
          >
            {isPending ? '削除中…' : '削除'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return { openModal: onOpen, setDeleteTarget, renderDeleteModal };
};

export default useDeleteModal;
