import ContentSwitcher from "@/components/ContentSwitcher"
import Menu from "@/components/Menu"
import Search from "@/components/Search"
import Logo from "@/components/ui/logo"
import { OnboardingProvider } from "./context/OnboardingContext"

export default function Home() {
  return (
    <>
      <Search />
      <nav className="mt-6 flex w-full items-center justify-between">
        <Logo />
        <Menu />
      </nav>
      <main className="flex h-full w-full flex-col items-center justify-center">
        <OnboardingProvider>
          <ContentSwitcher />
        </OnboardingProvider>
      </main>
    </>
  )
}
