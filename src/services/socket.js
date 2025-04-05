import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(process.env.REACT_APP_API_URL, {
      reconnectionDelay: 1000,
      reconnectionAttempts: 3,
      autoConnect: false,
    });

    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve(this.socket));
      this.socket.on('connect_error', (err) => reject(err));
      this.socket.connect();
    });
  }

  joinRoom(roomId) {
    return new Promise((resolve) => {
      this.socket.emit('join-room', roomId, (response) => {
        resolve(response);
      });
    });
  }

  onDocumentUpdate(callback) {
    this.socket.on('document-update', callback);
  }

  emitDocumentDelta(delta) {
    this.socket.emit('document-delta', delta);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();
