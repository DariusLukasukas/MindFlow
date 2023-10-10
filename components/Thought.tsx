"use client"

import React, { useEffect } from "react"
import { nanoid } from "nanoid"
import ThoughtItem from "./ThoughtItem"
import DOMPurify from "dompurify"
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext"
import Search from "./Search"

export interface Thought {
  id: string
  timestamp: number
  value: string
}

export default function Thought() {
  const { thoughts, setThoughts } = useKeyboardShortcuts()

  useEffect(() => {
    const storedThoughts = localStorage.getItem("thoughts")
    if (storedThoughts) {
      setThoughts(JSON.parse(storedThoughts))
    }
  }, [setThoughts])

  const handleAddThought = (value: string) => {
    if (value.length === 0) {
      return
    }

    const sanitizedValue = DOMPurify.sanitize(value)

    const newThought: Thought = {
      id: nanoid(),
      timestamp: Date.now(),
      value: sanitizedValue,
    }

    setThoughts([newThought, ...thoughts])

    localStorage.setItem("thoughts", JSON.stringify([newThought, ...thoughts]))
  }

  const handleDeleteThought = (id: string) => {
    const updatedThoughts = thoughts.filter((thought) => thought.id !== id)
    setThoughts(updatedThoughts)

    localStorage.setItem("thoughts", JSON.stringify(updatedThoughts))
  }

  return (
    <>
      <div className="mt-20 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-2">
        <h2 className="w-full p-3 text-2xl font-semibold selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
          Today
        </h2>
        <input
          spellCheck={false}
          placeholder="What's on your mind?"
          className="w-full rounded-lg border-transparent bg-transparent p-3 outline-none focus-visible:bg-neutral-100 dark:placeholder-neutral-500 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            const inputElement = event.target as HTMLInputElement
            if (event.key === "Enter") {
              handleAddThought(inputElement.value)
              inputElement.value = ""
            }
          }}
        />
        <hr className="w-full border-neutral-100 dark:border-neutral-900" />
        <ul className="w-full">
          {thoughts.map((thought) => (
            <ThoughtItem
              key={thought.id}
              thought={thought}
              onDelete={handleDeleteThought}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
