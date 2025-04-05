import axios from 'axios';
import { io } from 'socket.io-client';
import { create } from 'zustand';

const endpoint = 'http://localhost:5000/api';

const useStore = create((set, get) => ({
  requests: [],
  collections: [],
  response: {},
  history: [],
  request: null,
  userId: null,
  socket: null,
  isConnected: false,
  room: null,
  curpos: 0,
  collaborators: [],

  connect: () => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to socket server');
      set({ isConnected: true });
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      set({ isConnected: false });
    });

    socket.on('room-joined', (roomId) => {
      console.log('Joined room:', roomId);
      set({ room: roomId });
    });

    socket.on('document-update', (op, type, itemId, delta) => {
      console.log('Document update:', op, type, itemId, delta);
      // Handle document update logic here
      if (type == 'request') {
        if (op == 'create') {
          get().setRequests([...get().requests, delta]);
        } else if (op == 'del') {
          get().setRequests(
            ...get().requests.filter((r) => {
              r._id != delta._id;
            })
          );
        } else if (op == 'update') {
          get().setRequests(
            get().requests.map((r) => (r._id === delta._id ? delta : r))
          );
          if (delta._id == get().request._id) {
            get().setRequest(delta);
          }
        }
      } else if (type == 'collection') {
        if (op == 'create') {
          get().setCollections([...get().collections, delta]);
        } else if (op == 'del') {
          get().setCollections(
            ...get().collections.filter((r) => {
              r._id != delta._id;
            })
          );
        } else if (op == 'update') {
          get().setCollections(
            get().collections.map((r) => (r._id === delta._id ? delta : r))
          );
        }
      } else if (type == 'history') {
        if (op == 'create') {
          if (get().request._id == delta.requestId) {
            get().setHistory([...get().history, delta]);
            get().setResponse(delta);
          }
        }
      }
    });

    set({ socket });
  },

  joinRoom: (roomId) => {
    const socket = get().socket;
    if (!socket) {
      get().connect();
    }
    if (socket) {
      console.log('trying to join room', roomId);
      socket.emit('join-room', (get().userId, roomId), (response) => {
        console.log('Joined room:', response);
      });
    } else {
      console.error('Socket not connected');
    }
  },

  leaveRoom: (roomId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('disconnect', roomId, (response) => {
        console.log('Left room:', response);
      });
    } else {
      console.error('Socket not connected');
    }
  },

  setRoomId: (roomId) => {
    set({ room: roomId });
  },

  documentUpdate: (roomId, type, itemId, delta) => {
    const socket = get().socket;
    if (socket) {
      socket.emit('document-update', roomId, type, itemId, delta);
    } else {
      console.error('Socket not connected');
    }
  },

  login: (username, password) => {
    const req = axios.post(`${endpoint}/auth/login`, {
      username,
      password,
    });
    req
      .then((res) => {
        console.log(res.data);
        set({ userId: res.data._id });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  signUp: (username, password) => {
    const req = axios.post(`${endpoint}/auth/register`, {
      username,
      password,
    });
    req
      .then((res) => {
        console.log(res.data);
        set({ userId: res.data._id });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  setUserId: (userId) => set({ userId }),
  getUserId: () => {
    return set((state) => ({ userId: state.userId }));
  },

  setRequest: (request) => {
    set({ request });
    get().getRequest(request._id);
    get().getHistory(request._id);
    get().getLastResponse(request._id);
  },
  getRequest: (reqId) => {
    const req = axios.get(`${endpoint}/requests/${reqId}`);
    req
      .then((res) => {
        console.log(res.data);
        set({ request: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ request: state.request }));
  },
  addRequest: (request) => {
    const req = axios.post(`${endpoint}/requests/new`, {
      name: request.name,
      description: request.description || '',
      collectionId: request.collectionId || null,
      userId: get().userId,
      roomId: get().room || null,
    });
    req
      .then((res) => {
        console.log(res.data);
        set((state) => ({
          requests: [...state.requests, res.data],
        }));
        get().documentUpdate(get().room, 'create', 'request', res.data._id, {
          ...res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  updateRequest: (request) => {
    const req = axios.put(`${endpoint}/requests/`, {
      ...get().request,
      ...request,
    });
    req
      .then((res) => {
        console.log(res.data);
        get().setRequest({ ...request });
        set((state) => ({
          requests: state.requests.map((r) =>
            r._id === request._id ? { ...r, ...request } : r
          ),
        }));
        get().documentUpdate(
          get().room,
          'update',
          'request',
          request._id,
          request
        );
      })
      .catch((err) => {
        console.error(err);
      });
  },

  setRequests: (requests) => set({ requests }),
  getRequests: () => {
    const req = axios.get(`${endpoint}/requests`);
    req
      .then((res) => {
        console.log(res.data);
        set({ requests: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ requests: state.requests }));
  },

  getRequestsByUser: () => {
    const userId = get().userId;
    const req = axios.post(`${endpoint}/requests/user`, { userId });
    req
      .then((res) => {
        console.log(res.data);
        set({ requests: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ requests: state.requests }));
  },

  getRequestsByRoom: () => {
    const roomId = get().room;
    const req = axios.post(`${endpoint}/requests/room`, { roomId });
    req
      .then((res) => {
        console.log(res.data);
        set({ requests: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ requests: state.requests }));
  },

  removeRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id),
    })),

  setCollections: (collections) => set({ collections }),
  getCollections: () => {
    const req = axios.get(`${endpoint}/collections`);
    req
      .then((res) => {
        console.log(res.data);
        set({ collections: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ collections: state.collections }));
  },
  getCollectionsByUser: () => {
    const userId = get().userId;
    const req = axios.post(`${endpoint}/collections/user`, { userId });
    req
      .then((res) => {
        console.log(res.data);
        set({ collections: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ collections: state.collections }));
  },
  getCollectionsByRoom: () => {
    const roomId = get().room;
    const req = axios.post(`${endpoint}/collections/room`, { roomId });
    req
      .then((res) => {
        console.log(res.data);
        set({ collections: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ collections: state.collections }));
  },
  addCollection: (collection) => {
    const req = axios.post(`${endpoint}/collections`, {
      name: collection.name,
      description: collection.description || '',
      userId: get().userId,
      roomId: get().room || null,
    });
    req
      .then((res) => {
        console.log(res.data);
        set((state) => ({
          collections: [...state.collections, res.data],
        }));
        get().documentUpdate(
          get().room,
          'create',
          'collection',
          res.data._id,
          res.data
        );
      })
      .catch((err) => {
        console.error(err);
      });
  },
  removeCollection: (id) => {
    const req = axios.delete(`${endpoint}/collections/${id}`);
    req
      .then(() => {
        set((state) => ({
          collections: state.collections.filter(
            (collection) => collection.id !== id
          ),
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  },

  setRoom: (room) => {
    // TODO: go back to local room and requests ending collaboration
    set({ room });
  },
  getRoom: () => {
    return set((state) => ({ room: state.room }));
  },

  setCollaborators: (collaborators) => set({ collaborators }),
  getCollaborators: () => {
    return set((state) => ({ collaborators: state.collaborators }));
  },
  addCollaborator: (collaborator) =>
    set((state) => ({ collaborators: [...state.collaborators, collaborator] })),
  removeCollaborator: (id) =>
    set((state) => ({
      collaborators: state.collaborators.filter(
        (collaborator) => collaborator.id !== id
      ),
    })),

  setCurpos: (curpos) => set({ curpos }),
  getCurpos: () => {
    return set((state) => ({ curpos: state.curpos }));
  },
  addCurpos: (curpos) =>
    set((state) => ({ curpos: [...state.curpos, curpos] })),

  setResponse: (response) => set({ response }),
  getLastResponse: (reqId = '') => {
    const req = axios.post(`${endpoint}/history/last`, { requestId: reqId });
    req
      .then((res) => {
        console.log(res.data);
        set({ response: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ response: state.response }));
  },
  addResponse: (response) =>
    set((state) => ({ response: [...state.response, response] })),

  setHistory: (history) => set({ history }),
  getHistory: (reqId = '') => {
    const req = axios.post(`${endpoint}/history/req`, { requestId: reqId });
    req
      .then((res) => {
        console.log(res.data);
        set({ history: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ history: state.history }));
  },
  addHistory: (history) =>
    set((state) => ({ history: [...state.history, history] })),
  removeHistory: (id) =>
    set((state) => ({
      history: state.history.filter((history) => history.id !== id),
    })),

  sendRequest: (request) => {
    console.log({ ...request });
    const req = axios.post(`${endpoint}/requests`, { ...request });
    req
      .then((res) => {
        console.log(res.data);
        set({ response: res.data });
        get().getHistory(get().request._id);
        get().getLastResponse(get().request._id);
        get().documentUpdate(
          get().room,
          'create',
          'history',
          get().request._id,
          res.data
        );
      })
      .catch((err) => {
        console.error(err);
      });
    return set((state) => ({ response: state.response }));
  },
}));

export const viewStore = create((set, get) => ({
  viewNew: false,
  setViewNew: (viewNew) => set({ viewNew }),
  getViewNew: () => {
    return get().viewNew;
  },
}));

export default useStore;
