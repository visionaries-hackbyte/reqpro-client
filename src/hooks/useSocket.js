import { useEffect, useState } from 'react';
import SocketService from '../services/socket';

export default function useSocket(roomId) {
  const [isConnected, setIsConnected] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const setupSocket = async () => {
      try {
        await SocketService.connect(token);
        setIsConnected(true);

        if (roomId) {
          await SocketService.joinRoom(roomId);
        }

        SocketService.socket.on('room-presence', (users) => {
          setRoomUsers(users);
        });
      } catch (err) {
        console.error('Socket connection error:', err);
      }
    };

    setupSocket();

    return () => {
      SocketService.disconnect();
    };
  }, [roomId]);

  return {
    isConnected,
    roomUsers,
    emitDocumentDelta: SocketService.emitDocumentDelta,
    onDocumentUpdate: SocketService.onDocumentUpdate,
  };
}
