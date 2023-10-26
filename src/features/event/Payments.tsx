import { Box, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { formatNumberToJPY } from '../../utils';
import { DeleteIcon } from '@chakra-ui/icons';
import { useGetPaymentsQuery } from '@generated/graphql';

const Payments = ({
  id,
  setDeleteTarget,
  onOpen,
}: {
  id: string | string[] | undefined;
  setDeleteTarget: (deleteTarget: number | null) => void;
  onOpen: () => void;
}) => {
  const { data } = useGetPaymentsQuery(
    {
      eventId: id as string,
    },
    {
      suspense: true,
    },
  );
  return (
    <Box>
      {data?.payments.map((payment) => (
        <Box
          key={payment.id}
          borderRadius="md"
          shadow="base"
          my="3"
          bgColor="gray.50"
        >
          <Box textAlign="right">
            <DeleteIcon
              w={5}
              h={5}
              mt="3"
              mr="5"
              onClick={() => {
                setDeleteTarget(payment.id);
                onOpen();
              }}
            />
          </Box>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>支払い名</Td>
                <Td>{payment.name}</Td>
              </Tr>
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
