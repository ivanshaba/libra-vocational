import { createContext, useContext, ReactNode } from "react"
import { Post, Program, Coach } from "@/types"

interface AppContextType {
  posts: Post[]
  programs: Program[]
  coaches: Coach[]
  isLoading: boolean
  error: string | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Add state management logic here
  // You can use useState or integrate with a backend API

  const value = {
    posts: [],
    programs: [],
    coaches: [],
    isLoading: false,
    error: null,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
