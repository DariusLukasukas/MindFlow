"use client";

import { useState } from "react";
import ThoughtItem from "./ThoughtItem";
import { Thought } from "./Thought";

export default function ThoughtList() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // Track the selected item index

  const thoughts: Thought[] = []; // Initialize your thoughts array

  const handleSelectItem = (index: number) => {
    setSelectedItem(index); // Update the selected item index when an item is selected
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full w-full max-w-lg">
      <ul className="w-full">
        {thoughts.map((thought, index) => (
          <ThoughtItem
            key={thought.id}
            thought={thought}
            onDelete={() => handleDeleteThought(thought.id)}
            onSelect={() => handleSelectItem(index)} // Pass the onSelect callback
            isSelected={index === selectedItem} // Pass the isSelected prop
          />
        ))}
      </ul>
    </div>
  );
}
