"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useHotkeys } from "react-hotkeys-hook";
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext";

export default function Menu() {
  const { theme, setTheme } = useTheme();
  const {
    toggleBlur,
    clearThoughts,
    toggleSearchBar,
    isSearchBarVisible,
    setSearchTerm,
  } = useKeyboardShortcuts();

  useHotkeys(["t"], () => {
    setTheme(theme === "light" ? "dark" : "light");
  });

  useHotkeys(["b"], () => {
    toggleBlur();
  });

  useHotkeys(["ctrl + f"], () => {
    toggleSearchBar();
  });

  useHotkeys(["esc"], () => {
    isSearchBarVisible ? toggleSearchBar() : "";
    setSearchTerm("");
  });

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1.5 rounded-md hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:outline-none dark:focus:bg-neutral-800 focus:outline-none"
        tabIndex={0}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuItem onSelect={toggleBlur}>
          <span>Toggle Blur</span>
          <DropdownMenuShortcut>B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={toggleSearchBar}>
          <span>Search Thoughts</span>
          <DropdownMenuShortcut>ctrl+F</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleChangeTheme}>
          <span>Toggle Theme</span>
          <DropdownMenuShortcut>T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={clearThoughts}>
          Clear Thoughts
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
