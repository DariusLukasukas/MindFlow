"use client"

import { useEffect, useMemo, useState } from "react"
import ThoughtItem from "./ThoughtItem"
import { useKeyboardShortcuts } from "@/app/context/KeyboardShortcutsContext"
import { useOnboarding } from "@/app/context/OnboardingContext"

export default function Onboarding() {
  const { isGlobalBlur, searchTerm } = useKeyboardShortcuts()
  const { setIsOnboardingCompleted } = useOnboarding()

  const onboardingSteps = useMemo(
    () => [
      "Welcome to Flow.",
      "Clear your mind through raw, unfiltered writing.",
      "Thoughts will fade into the background to make space for new ones.",
      "Don't worry. You can always come back to read your thought process.",
    ],
    []
  )

  const [currentStep, setCurrentStep] = useState(0)

  const handleClick = () => {
    localStorage.setItem("HAS_ONBOARDED", "true")
    setIsOnboardingCompleted(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1)
      }
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [currentStep, onboardingSteps])

  return (
    <>
      <div className="mt-20 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-2">
        <h2 className="w-full p-3 text-2xl font-bold">Onboarding</h2>
        <hr className="w-full border-neutral-100 dark:border-neutral-900" />
        <ul className="w-full">
          {onboardingSteps.slice(0, currentStep + 1).map((step, index) => (
            <ThoughtItem
              key={index}
              isGlobalBlur={isGlobalBlur}
              searchTerm={searchTerm}
              thought={{
                id: index.toString(),
                timestamp: Date.now(),
                value: step,
                isNew: true,
              }}
            />
          ))}
        </ul>
        <div className="flex w-full justify-start">
          <button
            tabIndex={0}
            onClick={handleClick}
            className="ml-1 rounded-md p-2.5 text-black hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:focus:outline-none"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
