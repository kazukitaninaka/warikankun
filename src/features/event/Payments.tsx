import {
  Box,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Tr,
  Text,
} from '@chakra-ui/react';
import { formatNumberToJPY } from '../../utils';
import { DeleteIcon } from '@chakra-ui/icons';
import { useQueryPaymentsQuery } from '../../generated/graphql';

const Payments = ({
  id,
  setDeleteTarget,
  onOpen,
}: {
  id: string | string[] | undefined;
  setDeleteTarget: (deleteTarget: number | null) => void;
  onOpen: () => void;
}) => {
  const { loading, error, data } = useQueryPaymentsQuery({
    variables: { eventId: id },
  });
  if (loading) {
    return (
      <Center mt="3">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (error) {
    return <Text data-testid="errorText">データ取得に失敗しました。</Text>;
  }
  return (
    <Box>
      {data?.events[0].payments.map((payment) => (
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
                <Td>{payment.whoPaid.name}</Td>
              </Tr>
              <Tr>
                <Td>金額</Td>
                <Td>{formatNumberToJPY(payment.amount)}</Td>
              </Tr>
              <Tr>
                <Td>割り勘対象</Td>
                <Td>
                  {payment.whoShouldPay.map((_) => (
                    <span key={_.participant.id}>{_.participant.name}　</span>
                  ))}
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
