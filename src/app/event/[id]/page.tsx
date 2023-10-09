import EventComponent from '@features/event/Event';

const Event = ({
  params,
}: {
  params: {
    id: string | string[] | undefined;
  };
}) => {
  if (typeof params.id === 'string') {
    return <EventComponent id={params.id} />;
  } else {
    return <></>;
  }
};

export default Event;
