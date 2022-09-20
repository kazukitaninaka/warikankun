import { NextPage } from 'next';
import Calculate from '@features/calculate/Calculate';
import { useRouter } from 'next/router';
import { parseId } from '@utils/index';

const Calc: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return <></>;
  const eventId = parseId(id);
  return <Calculate id={eventId} />;
};

export default Calc;
