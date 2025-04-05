import { Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStore, { viewStore } from '../../stores/useRequestStore';

const Sidebar = () => {
  const { setViewNew } = viewStore();
  const {
    collections,
    requests,
    setRequest,
    getCollectionsByUser,
    getCollectionsByRoom,
    getRequestsByUser,
    getRequestsByRoom,
    room,
    userId,
    setRoomId,
  } = useStore();

  const [roomId, setRoomIdn] = useState(room);

  useEffect(() => {
    if (room) {
      getCollectionsByRoom(room);
      getRequestsByRoom(room);
    } else {
      getCollectionsByUser(userId);
      getRequestsByUser(userId);
    }
  }, [userId, room]);

  return (
    <div>
      <Button variant='contained' onClick={() => setViewNew(true)}>
        New
      </Button>
      <TextField
        value={roomId}
        label='Room ID'
        onChange={(e) => setRoomIdn(e.target.value)}
      />
      <Button variant='contained' onClick={() => setRoomId(roomId)}>
        Join
      </Button>
      <Container>
        {collections.map((collection) => (
          <div key={collection._id}>
            <h3>{collection.name}</h3>
            {requests
              .filter((request) => request.collectionId === collection._id)
              .map((request) => (
                <div
                  onClick={() => {
                    setRequest(request);
                  }}
                  key={request._id}
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
              key={request._id}
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
