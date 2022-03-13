import { ApolloError } from '@apollo/client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  setDeleteTarget: Dispatch<SetStateAction<number | null>>;
  loading: boolean;
  error: ApolloError | undefined;
};

const ModalComponent: React.FC<Props> = ({
  isOpen,
  onClose,
  onClick,
  setDeleteTarget,
  loading,
  error,
}) => {
  return (
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
            onClick={onClick}
            disabled={loading}
          >
            {loading ? '削除中…' : '削除'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
