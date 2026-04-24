import SignIn from "@/pages/auth/SignIn"
import SignUp from "@/pages/auth/SignUp"
import { Route, Routes } from "react-router-dom"

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  )
}
