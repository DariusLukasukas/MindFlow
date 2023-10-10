"use client"

import { useEffect, useState } from "react"
import { Thought } from "./Thought"
import { formatThoughtTimestamp } from "@/lib/formatThoughtTimestamp"
import { twMerge } from "tailwind-merge"

interface ThoughtItemProps {
  thought: Thought
  onDelete: (id: string) => void
  isGlobalBlur: boolean
  searchTerm?: string
}

export default function ThoughtItem({
  thought,
  onDelete,
  isGlobalBlur,
  searchTerm,
}: ThoughtItemProps) {
  const [displayedTimestamp, setDisplayedTimestamp] = useState(
    formatThoughtTimestamp(thought.timestamp)
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedTimestamp(formatThoughtTimestamp(thought.timestamp))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [thought.timestamp])

  const [isThoughtNew, setIsThoughtNew] = useState(thought.isNew)
  useEffect(() => {
    if (isThoughtNew && isGlobalBlur) {
      const timeout = setTimeout(() => {
        setIsThoughtNew(false)

        const { isNew, ...thoughtWithoutIsNew } = thought
        const updatedThoughts = JSON.parse(
          localStorage.getItem("thoughts") || "[]"
        )
        const index = updatedThoughts.findIndex(
          (t: Thought) => t.id === thought.id
        )
        if (index !== -1) {
          updatedThoughts[index] = thoughtWithoutIsNew
          localStorage.setItem("thoughts", JSON.stringify(updatedThoughts))
        }
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [thought, isGlobalBlur, isThoughtNew])

  useEffect(() => {
    if (!isGlobalBlur) {
      setIsThoughtNew(false)
    }
  }, [isGlobalBlur])

  return (
    <li
      key={thought.id}
      className={twMerge(
        "group relative flex w-full items-center gap-2 rounded-md p-3 transition hover:bg-neutral-100 hover:blur-0 focus:bg-neutral-100 focus:outline-none focus:blur-0 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
        isGlobalBlur
          ? isThoughtNew
            ? "blur-0"
            : "translate-all blur-sm duration-700 ease-in-out"
          : "blur-0"
      )}
      tabIndex={0}
    >
      <span
        className={twMerge(
          "absolute -left-20 hidden select-none text-sm text-neutral-500 transition delay-1000 ease-in-out group-hover:block group-focus:block dark:text-neutral-200"
        )}
      >
        {displayedTimestamp}
      </span>
      <p className="text-black dark:text-neutral-100">{thought.value}</p>
      <button
        className="ml-auto hidden text-sm text-red-500 hover:underline group-hover:block"
        onClick={() => onDelete(thought.id)}
      >
        Delete
      </button>
    </li>
  )
}
