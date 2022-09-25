import { NextPage } from 'next';
import AddComponent from '@features/event/add/Add';
import { useRouter } from 'next/router';
import { parseId } from '@utils/index';

const Add: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return <></>;
  const eventId = parseId(id);
  return <AddComponent id={eventId} />;
};

export default Add;
