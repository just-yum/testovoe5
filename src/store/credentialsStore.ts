import { create } from "zustand/react";

interface CredentialsState {
  instanceId: string
  apiToken: string
  updateInstance: (instance: string) => void
  updateToken: (token: string) => void
}
export const useCredentialsStore = create<CredentialsState>(set => ({
  instanceId: '',
  apiToken: '',
  updateInstance: (instance) => set({ instanceId: instance }),
  updateToken: (token) => set({ apiToken: token }),
}))