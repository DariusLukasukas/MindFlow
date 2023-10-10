"use client"

import React, { createContext, useState } from "react"

export interface Thought {
  id: string
  timestamp: number
  value: string
}

export const KeyboardShortcutsContext = createContext({
  isGlobalBlur: true,
  thoughts: [] as Thought[],
  clearThoughts: () => {},
  setThoughts: (thoughts: Thought[]) => {},
  isSearchBarVisible: false,
  toggleSearchBar: () => {},
  searchTerm: "",
  setSearchTerm: (string: string) => {},
})

export const KeyboardShortcutsProvider = ({ children }: any) => {
  const [isGlobalBlur, setIsGlobalBlur] = useState(true)
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")

  const toggleBlur = () => {
    setIsGlobalBlur((prev) => !prev)
  }

  const clearThoughts = () => {
    setThoughts([])
    localStorage.removeItem("thoughts")
  }

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev)
  }

  const value = {
    isGlobalBlur,
    toggleBlur,
    thoughts,
    setThoughts,
    clearThoughts,
    isSearchBarVisible,
    toggleSearchBar,
    searchTerm,
    setSearchTerm,
  }

  return (
    <KeyboardShortcutsContext.Provider value={value}>
      {children}
    </KeyboardShortcutsContext.Provider>
  )
}

export const useKeyboardShortcuts = () => {
  const context = React.useContext(KeyboardShortcutsContext)

  if (!context) {
    throw new Error(
      "useKeyboardShortcuts must be used within a KeyboardShortcutsProvider"
    )
  }

  return context
}
