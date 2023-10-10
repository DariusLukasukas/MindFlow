import Menu from "@/components/Menu"
import Search from "@/components/Search"
import Thought from "@/components/Thought"
import Logo from "@/components/ui/logo"

export default function Home() {
  return (
    <>
      <Search />
      <nav className="mt-6 flex w-full items-center justify-between">
        <Logo />
        <Menu />
      </nav>
      <main className="flex h-full w-full flex-col items-center justify-center">
        <Thought />
      </main>
    </>
  )
}
