import { create } from 'zustand';

interface AppState {
    email: string
    setEmail: (by: string) => void
}

const useStore = create<AppState>()((set) => ({
    email: "",
    setEmail: (mail) => set(() => ({ email: mail }))
}))

export default useStore;