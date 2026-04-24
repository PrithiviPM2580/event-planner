import SignIn from "@/pages/auth/SignIn"
import SignUp from "@/pages/auth/SignUp"
import Dashboard from "@/pages/dashboard/Dashboard"
import Home from "@/pages/home/Home"
import { Route, Routes } from "react-router-dom"

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
