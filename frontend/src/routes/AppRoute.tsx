import { Route, Routes } from "react-router-dom"

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  )
}
