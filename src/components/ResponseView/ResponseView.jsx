import React from 'react';
import useStore from '../../stores/useRequestStore';

const ResponseView = () => {
  const { response } = useStore();
  return <div>{response}</div>;
};

export default ResponseView;
