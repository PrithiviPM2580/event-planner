import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="font-bold text-primary">EventPlanner</div>
      <nav className="hidden gap-4 md:flex">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "text-black/60 dark:text-white"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/sign-in"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "text-black/60 dark:text-white"
          }
        >
          Sign In
        </NavLink>
      </nav>
      <div className="flex gap-4">
        <ModeToggle />
        <Button className="rounded-2xl px-4">Get Started</Button>
      </div>
    </header>
  )
}
