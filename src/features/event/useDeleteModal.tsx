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
import { useDeletePaymentMutation } from '@generated/graphql';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, _setDeleteTarget] = useState<number | null>(null);
  const { isError, isLoading, mutate } = useDeletePaymentMutation();
  const queryClient = useQueryClient();

  const deletePayment = () => {
    if (!deleteTarget) return;
    mutate(
      { paymentId: deleteTarget },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
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
        <ModalCloseButton />
        <ModalBody textAlign="center" mt="2">
          <Text>本当に削除しますか？</Text>
          {isError && <Text fontSize="lg">Error: 削除に失敗しました。</Text>}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mx="auto"
            onClick={deletePayment}
            disabled={isLoading}
          >
            {isLoading ? '削除中…' : '削除'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return { openModal: onOpen, setDeleteTarget, renderDeleteModal };
};

export default useDeleteModal;
