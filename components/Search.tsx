"use client";

import React, { useState } from "react";
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext";

export default function Search() {
  const { isSearchBarVisible, setSearchTerm } = useKeyboardShortcuts();
  const [searchTermValue, setSearchTermValue] = useState("");

  return (
    <>
      <div className="fixed left-1/2 right-1/2 flex justify-center items-center z-10">
        {isSearchBarVisible && (
          <input
            type="search"
            placeholder="Search thoughts..."
            className="border-transparent bg-neutral-100 dark:bg-neutral-900 focus-visible:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900 dark:placeholder-neutral-500 p-3 rounded-lg text-sm outline-none z-10"
            value={searchTermValue}
            onChange={(e) => {
              setSearchTermValue(e.target.value);
              setSearchTerm(e.target.value);
            }}
            tabIndex={0}
          />
        )}
      </div>
      {isSearchBarVisible && (
        <div className="absolute left-0 w-full bg-white dark:bg-black h-20 blur-lg -top-5" />
      )}
    </>
  );
}
