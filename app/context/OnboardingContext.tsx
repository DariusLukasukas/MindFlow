"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

const OnboardingContext = createContext({
  isOnboardingCompleted: false,
  setIsOnboardingCompleted: (value: boolean) => {},
})

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(Boolean)

  useEffect(() => {
    setIsOnboardingCompleted(localStorage.getItem("HAS_ONBOARDED") === "true")
  }, [])

  const values = {
    isOnboardingCompleted,
    setIsOnboardingCompleted,
  }

  return (
    <OnboardingContext.Provider value={values}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
