"use client"

import { useEffect, useState } from "react"
import { Thought } from "./Thought"
import { formatThoughtTimestamp } from "@/lib/formatThoughtTimestamp"
import { twMerge } from "tailwind-merge"

interface ThoughtItemProps {
  thought: Thought
  onDelete?: (id: string) => void
  isGlobalBlur?: boolean
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
          localStorage.getItem("THOUGHTS") || "[]"
        )
        const index = updatedThoughts.findIndex(
          (t: Thought) => t.id === thought.id
        )
        if (index !== -1) {
          updatedThoughts[index] = thoughtWithoutIsNew
          localStorage.setItem("THOUGHTS", JSON.stringify(updatedThoughts))
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

  const isMatch =
    searchTerm &&
    searchTerm.trim() !== "" &&
    thought.value.toLowerCase().includes(searchTerm.toLowerCase())

  return (
    <li
      key={thought.id}
      className={twMerge(
        "group relative flex w-full items-center gap-2 rounded-md p-3 opacity-0 transition-opacity duration-700 ease-in-out hover:bg-neutral-100 hover:opacity-100 hover:blur-0 hover:transition-all hover:duration-500 focus:bg-neutral-100 focus:opacity-100 focus:outline-none focus:blur-0 focus:transition focus:delay-0 focus:duration-500 dark:hover:bg-neutral-800  dark:focus:bg-neutral-800",
        isGlobalBlur
          ? isThoughtNew
            ? "opacity-100 blur-0"
            : isMatch
            ? "opacity-100 blur-0"
            : "opacity-50 blur-sm ease-in"
          : "opacity-100 blur-0"
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
      <p className="break-all text-black dark:text-neutral-100">
        {thought.value}
      </p>
      {onDelete && (
        <button
          aria-label="Delete thought"
          className="ml-auto hidden select-none text-sm text-red-500 ease-in hover:underline group-hover:block"
          onClick={() => onDelete(thought.id)}
        >
          Delete
        </button>
      )}
    </li>
  )
}
