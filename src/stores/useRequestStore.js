import axios from 'axios';
import { create } from 'zustand';

const endpoint = 'http://localhost:5000/api';

const useStore = create((set, get) => ({
  requests: [],
  collections: [],
  room: null,
  collaborators: [],
  curpos: 0,
  response: {},
  history: [],
  request: null,

  setRequest: (request) => {
    set({ request });
    get().getRequest(request._id);
    get().getHistory(request._id);
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
    });
    req
      .then((res) => {
        console.log(res.data);
        set((state) => ({
          requests: [...state.requests, res.data],
        }));
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
  addCollection: (collection) => {
    const req = axios.post(`${endpoint}/collections`, {
      name: collection.name,
      description: collection.description || '',
    });
    req
      .then((res) => {
        console.log(res.data);
        set((state) => ({
          collections: [...state.collections, res.data],
        }));
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
