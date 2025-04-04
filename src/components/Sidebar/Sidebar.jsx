import { Button, Container } from '@mui/material';
import React from 'react';
import useStore, { viewStore } from '../../stores/useRequestStore';

const Sidebar = () => {
  const { setViewNew } = viewStore();
  const { collections, requests, setRequest } = useStore();

  return (
    <div>
      <Button variant='contained' onClick={() => setViewNew(true)}>
        New
      </Button>
      <Container>
        {collections.map((collection) => (
          <div key={collection.id}>
            <h3>{collection.name}</h3>
            {requests
              .filter((request) => request.collectionId === collection.id)
              .map((request) => (
                <div
                  onClick={() => {
                    setRequest(request);
                  }}
                  key={request.id}
                  style={{
                    marginLeft: '20px',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}>
                  <p>{request.name}</p>
                </div>
              ))}
          </div>
        ))}
        {requests
          .filter((request) => request.collectionId === null)
          .map((request) => (
            <div
              key={request.id}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                setRequest(request);
              }}>
              <p>{request.name}</p>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Sidebar;
