import { create } from 'zustand';

const useStore = create((set, get) => ({
  requests: [],
  collections: [],
  room: null,
  collaborators: [],
  curpos: 0,
  response: null,
  history: [],
  request: null,

  setRequest: (request) => set({ request }),
  getRequest: () => {
    return set((state) => ({ request: state.request }));
  },

  setRequests: (requests) => set({ requests }),
  getRequests: () => {
    return set((state) => ({ requests: state.requests }));
  },
  addRequest: (request) =>
    set((state) => {
      request.id = get().requests.length + 1;
      return { requests: [...state.requests, request] };
    }),
  removeRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== id),
    })),

  setCollections: (collections) => set({ collections }),
  getCollections: () => {
    return set((state) => ({ collections: state.collections }));
  },
  addCollection: (collection) =>
    set((state) => {
      collection.id = get().collections.length + 1;
      return { collections: [...state.collections, collection] };
    }),
  removeCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter(
        (collection) => collection.id !== id
      ),
    })),

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
  getResponse: () => {
    return set((state) => ({ response: state.response }));
  },
  addResponse: (response) =>
    set((state) => ({ response: [...state.response, response] })),

  setHistory: (history) => set({ history }),
  getHistory: () => {
    return set((state) => ({ history: state.history }));
  },
  addHistory: (history) =>
    set((state) => ({ history: [...state.history, history] })),
  removeHistory: (id) =>
    set((state) => ({
      history: state.history.filter((history) => history.id !== id),
    })),
}));

export const viewStore = create((set, get) => ({
  viewNew: false,
  setViewNew: (viewNew) => set({ viewNew }),
  getViewNew: () => {
    return get().viewNew;
  },
}));

export default useStore;
