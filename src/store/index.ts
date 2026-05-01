import { create } from 'zustand'

interface AppState {
  collapsed: boolean
  currentRoute: string
  setCollapsed: (collapsed: boolean) => void
  setCurrentRoute: (route: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  collapsed: false,
  currentRoute: '/dashboard',
  setCollapsed: (collapsed) => set({ collapsed }),
  setCurrentRoute: (currentRoute) => set({ currentRoute }),
}))
