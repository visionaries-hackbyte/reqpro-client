import React, { useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import useStore from '../../stores/useRequestStore';

const HistoryView = () => {
  const { request, history, getHistory } = useStore();
  useEffect(() => {
    if (request) {
      getHistory(request._id);
    }
  }, [getHistory, request]);
  return (
    <div>
      {history.length > 0 ? (
        history.map((item) => (
          <div
            style={{
              boxSizing: 'border-box',
              marginRight: '10px',
            }}>
            <JSONTree
              data={item}
              theme='monokai'
              invertTheme={false}
              hideRoot={true}
            />
          </div>
        ))
      ) : (
        <div
          style={{
            marginLeft: '20px',
            boxSizing: 'border-box',
            color: '#888',
          }}>
          <p>No history available</p>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
