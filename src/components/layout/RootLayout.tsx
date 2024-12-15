import { Outlet } from "react-router-dom"
import { MainNav } from "./MainNav"
import { MobileNav } from "./MobileNav"
import { Footer } from "./Footer"

export function RootLayout() {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <MobileNav/>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
