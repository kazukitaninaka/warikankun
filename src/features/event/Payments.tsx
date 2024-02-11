'use client';

import { Box, Button, Flex, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { formatNumberToJPY } from '../../utils';
import { useGetPaymentsQuery } from '@generated/graphql';
import useDeleteModal from './useDeleteModal';
import Image from 'next/image';

const Payments = ({ id }: { id: string }) => {
  const { data } = useGetPaymentsQuery({
    eventId: id as string,
  });
  const { renderDeleteModal, openModal, setDeleteTarget } = useDeleteModal({
    id,
  });

  return (
    <Box>
      {renderDeleteModal()}
      {data?.payments.map((payment) => (
        <Box
          key={payment.id}
          borderRadius="md"
          shadow="base"
          my="3"
          bgColor="gray.50"
        >
          <Flex justifyContent="space-between">
            <Box as="p" ml="6" mt="2" fontSize="large" fontWeight="bold">
              {payment.name}
            </Box>
            <Button
              variant="ghost"
              p="2"
              onClick={() => {
                setDeleteTarget(payment.id);
                openModal();
              }}
            >
              <Image
                src="/icons/delete.svg"
                alt="削除"
                width="20"
                height="20"
              />
            </Button>
          </Flex>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>支払った人</Td>
                <Td>{payment.whoPaid?.name}</Td>
              </Tr>
              <Tr>
                <Td>金額</Td>
                <Td>{formatNumberToJPY(payment.amount)}</Td>
              </Tr>
              <Tr>
                <Td>割り勘対象</Td>
                <Td>
                  {payment.whoShouldPay?.map((participant) =>
                    // ratioが0の時とnullの時は表示しない
                    participant.ratio ? (
                      <span key={participant.id}>{participant.name} </span>
                    ) : null,
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default Payments;
