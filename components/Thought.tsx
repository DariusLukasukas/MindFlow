"use client"

import React, { useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"
import ThoughtItem from "./ThoughtItem"
import DOMPurify from "dompurify"
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext"
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea"

export interface Thought {
  id: string
  timestamp: number
  value: string
  isNew?: boolean
}

export default function Thought() {
  const { thoughts, setThoughts, isGlobalBlur, searchTerm } =
    useKeyboardShortcuts()

  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value

    setValue(val)
  }

  useEffect(() => {
    const storedThoughts = localStorage.getItem("THOUGHTS")
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
      isNew: true,
    }

    setThoughts([newThought, ...thoughts])

    localStorage.setItem("THOUGHTS", JSON.stringify([newThought, ...thoughts]))
  }

  const handleDeleteThought = (id: string) => {
    const updatedThoughts = thoughts.filter((thought) => thought.id !== id)
    setThoughts(updatedThoughts)

    localStorage.setItem("THOUGHTS", JSON.stringify(updatedThoughts))
  }

  return (
    <>
      <div className="mt-20 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-2">
        <h2 className="w-full p-3 text-2xl font-bold">Today</h2>
        <textarea
          rows={1}
          spellCheck={false}
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          placeholder="What's on your mind?"
          className="no-scrollbar w-full rounded-lg border-transparent bg-transparent p-3 outline-none focus-visible:bg-neutral-100 dark:placeholder-neutral-500 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const inputElement = event.target as HTMLTextAreaElement
            if (event.key === "Enter") {
              event.preventDefault()
              handleAddThought(inputElement.value)
              setValue((inputElement.value = ""))
              //   inputElement.value = ""
            }
          }}
        />
        <hr className="w-full border-neutral-100 dark:border-neutral-900" />
        <ul className="relative w-full">
          {thoughts.map((thought) => (
            <ThoughtItem
              key={thought.id}
              thought={thought}
              onDelete={handleDeleteThought}
              isGlobalBlur={isGlobalBlur}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
