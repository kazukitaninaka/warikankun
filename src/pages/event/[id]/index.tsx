import { NextPage } from 'next';
import EventComponent from '@features/event/Event';
import { useRouter } from 'next/router';
import { parseId } from '@utils/index';

const Event: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return <></>;
  const eventId = parseId(id);
  return <EventComponent id={eventId} />;
};

export default Event;
