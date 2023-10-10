"use client";

import { useEffect, useState } from "react";
import { Thought } from "./Thought";
import { formatThoughtTimestamp } from "@/lib/formatThoughtTimestamp";
import { twMerge } from "tailwind-merge";
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext";

interface ThoughtItemProps {
  thought: Thought;
  onDelete: (id: string) => void;
}

export default function ThoughtItem({ thought, onDelete }: ThoughtItemProps) {
  const [displayedTimestamp, setDisplayedTimestamp] = useState(
    formatThoughtTimestamp(thought.timestamp)
  );
  const [isBlurred, setIsBlurred] = useState(true);
  const { isBlurred: globalBlur, searchTerm } = useKeyboardShortcuts();

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedTimestamp(formatThoughtTimestamp(thought.timestamp));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [thought.timestamp]);

  useEffect(() => {
    if (globalBlur) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  }, [globalBlur]);

  const isMatch = thought.value
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  return (
    <li
      key={thought.id}
      className={twMerge(
        "group items-center hover:blur-0 select-none hover:bg-neutral-100 dark:hover:bg-neutral-800 relative flex gap-2 w-full p-3 rounded-md focus:blur-0 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800 transition",
        isBlurred ? "ease-in-out transition blur-sm duration-500" : "",
        searchTerm && isMatch ? "blur-0" : ""
      )}
      tabIndex={0}
    >
      <span
        className={twMerge(
          "absolute text-sm group-hover:block hidden -left-20 text-neutral-500 dark:text-neutral-200 group-focus:block transition duration-500 ease-in-out",
          searchTerm && isMatch ? "block" : ""
        )}
      >
        {displayedTimestamp}
      </span>
      <p className="dark:text-neutral-100 text-black">{thought.value}</p>
      <button
        className="text-sm group-hover:block text-red-500 hidden hover:underline ml-auto"
        onClick={() => onDelete(thought.id)}
      >
        Delete
      </button>
    </li>
  );
}
