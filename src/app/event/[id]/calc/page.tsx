import Calculate from '@features/calculate/Calculate';

const Add = ({
  params,
}: {
  params: {
    id: string | string[] | undefined;
  };
}) => {
  if (typeof params.id === 'string') {
    return <Calculate id={params.id} />;
  } else {
    return <></>;
  }
};

export default Add;
