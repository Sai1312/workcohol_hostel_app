import { create } from 'zustand';

const authStore = create((set) => ({
  userId: null,
  email: null,
  role: null,
  setUser: ({ id, role, email }) => set({ id, role, email }),
  clearUser: () => set({ userId: null, role: null, email: null }),
}));

export default authStore;