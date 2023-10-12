"use client"

import { useOnboarding } from "@/app/context/OnboardingContext"
import Onboarding from "./Onboarding"
import Thought from "./Thought"
import { useEffect, useState } from "react"

export default function ContentSwitcher() {
  const { isOnboardingCompleted } = useOnboarding()

  const [onboardingItemNotInLocalStorage, setOnboardingItemNotInLocalStorage] =
    useState(Boolean)

  useEffect(() => {
    const item = localStorage.getItem("HAS_ONBOARDED") === null
    setOnboardingItemNotInLocalStorage(item)
  }, [])

  return (
    <>
      {isOnboardingCompleted && <Thought />}
      {onboardingItemNotInLocalStorage && !isOnboardingCompleted && (
        <Onboarding />
      )}
    </>
  )
}
