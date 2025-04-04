import React from 'react';
import useStore from '../../stores/useRequestStore';

const HistoryView = () => {
  const {history} = useStore()
  return <div>
    {history.map((item) => (
      <div key={item.id} style={{ marginLeft: '20px', boxSizing: 'border-box' }}>
        <p>{item.name}</p>
      </div>
    ))}
  </div>;
};

export default HistoryView;
