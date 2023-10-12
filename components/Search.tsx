"use client"

import React, { useState } from "react"
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext"

export default function Search() {
  const { isSearchBarVisible, setSearchTerm } = useKeyboardShortcuts()
  const [searchTermValue, setSearchTermValue] = useState("")

  return (
    <>
      <div className="fixed left-1/2 right-1/2 z-10 flex items-center justify-center">
        {isSearchBarVisible && (
          <input
            type="search"
            id="searchInput"
            placeholder="Search thoughts..."
            className="z-10 rounded-lg border-[1px] border-black/5 bg-white p-3 text-sm shadow-md shadow-neutral-300 outline-none dark:border-none dark:bg-neutral-900 dark:placeholder-neutral-500 dark:shadow-none dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900"
            value={searchTermValue}
            onChange={(e) => {
              setSearchTermValue(e.target.value)
              setSearchTerm(e.target.value)
            }}
            tabIndex={0}
          />
        )}
      </div>
      {isSearchBarVisible && (
        <div className="absolute -top-5 left-0 h-20 w-full bg-white blur-lg dark:bg-black" />
      )}
    </>
  )
}
