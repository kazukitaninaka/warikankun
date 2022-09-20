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
import { useDeletePaymentMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

const useDeleteModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteTarget, _setDeleteTarget] = useState<number | null>(null);
  const [Mutation, { loading, error }] = useDeletePaymentMutation();

  const deletePayment = () => {
    if (deleteTarget) {
      Mutation({ variables: { paymentId: deleteTarget } }).then(() => {
        onClose();
        router.reload();
      });
    }
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
          {error && <Text fontSize="lg">Error: 削除に失敗しました。</Text>}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mx="auto"
            onClick={deletePayment}
            disabled={loading}
          >
            {loading ? '削除中…' : '削除'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  return { openModal: onOpen, setDeleteTarget, renderDeleteModal };
};

export default useDeleteModal;
