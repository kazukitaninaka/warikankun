import AddComponent from '@features/event/add/Add';

const Add = ({
  params,
}: {
  params: {
    id: string | string[] | undefined;
  };
}) => {
  if (typeof params.id === 'string') {
    return <AddComponent id={params.id} />;
  } else {
    return <></>;
  }
};

export default Add;
