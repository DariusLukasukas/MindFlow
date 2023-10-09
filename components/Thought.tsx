"use client";

import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import ThoughtItem from "./ThoughtItem";
import DOMPurify from "dompurify";
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext";

export interface Thought {
  id: string;
  timestamp: number;
  value: string;
}

export default function Thought() {
  const { thoughts, setThoughts } = useKeyboardShortcuts();

  useEffect(() => {
    const storedThoughts = localStorage.getItem("thoughts");
    if (storedThoughts) {
      setThoughts(JSON.parse(storedThoughts));
    }
  }, [setThoughts]);

  const handleAddThought = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);

    const newThought: Thought = {
      id: nanoid(),
      timestamp: Date.now(),
      value: sanitizedValue,
    };

    setThoughts([newThought, ...thoughts]);

    localStorage.setItem("thoughts", JSON.stringify([newThought, ...thoughts]));
  };

  const handleDeleteThought = (id: string) => {
    const updatedThoughts = thoughts.filter((thought) => thought.id !== id);
    setThoughts(updatedThoughts);

    localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));
  };

  return (
    <>
      <div className="flex mt-20 flex-col gap-2 items-center justify-center h-full w-full max-w-4xl">
        <h2 className="p-3 text-2xl font-semibold w-full selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
          Today
        </h2>
        <input
          spellCheck={false}
          placeholder="What's on your mind?"
          className="w-full border-transparent bg-transparent focus-visible:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800 dark:placeholder-neutral-500 p-3 rounded-lg outline-none"
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            const inputElement = event.target as HTMLInputElement;
            if (event.key === "Enter") {
              handleAddThought(inputElement.value);
              inputElement.value = "";
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
  );
}
