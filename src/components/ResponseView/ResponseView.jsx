import React, { useEffect } from 'react';
import { JSONTree } from 'react-json-tree';
import useStore from '../../stores/useRequestStore';

const ResponseView = () => {
  const { response, getLastResponse, request } = useStore();
  useEffect(() => {
    if (request) {
      getLastResponse(request._id);
    }
  }, [getLastResponse, request]);
  return (
    <div>
      {response?._id ? (
        <JSONTree
          data={response}
          theme='monokai'
          invertTheme={false}
          hideRoot={true}
        />
      ) : (
        <div
          style={{
            marginLeft: '20px',
            boxSizing: 'border-box',
            color: '#888',
          }}>
          <p>No response available</p>
        </div>
      )}
    </div>
  );
};

export default ResponseView;
