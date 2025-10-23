import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import LeaderDashboard from "./pages/leaderDashboard"
import ScoutManagement from "./pages/ScoutManagement"
import Addleaders from "./pages/Addleader"
import ScoutDashboard from "./pages/scoutDashboard"
import type { User } from "@supabase/supabase-js"
import PrivateRoute from "./components/PrivateRoute"
import AuthHelper from "./Authhelper"
import { useState } from "react"

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState("")
  const [loading, setLoading] = useState(true)


  return (
    <>
    <AuthHelper 
    userRole={userRole} 
    setUserRole={setUserRole} 
    setUser={setUser}
    setLoading = {setLoading}
    />
    <Routes>
      <Route path="/login" element={
          <LoginPage/>} />

      <Route path="/leaderDashboard" element={
        <PrivateRoute 
        allowedRoles={['leader']} user={user} userRole={userRole} loading={loading}>
        <LeaderDashboard />
        </PrivateRoute>} />

      <Route path="/leaderDashboard/managescouts" element={
        <PrivateRoute 
        allowedRoles={['leader']} user={user} userRole={userRole} loading={loading}>
        <ScoutManagement />
        </PrivateRoute>
      } />

      <Route path="/leaderDashboard/addleaders" element={
        <PrivateRoute 
        allowedRoles={['leader']} user={user} userRole={userRole} loading={loading}>
        <Addleaders />
        </PrivateRoute>
      } />

      <Route path="/scoutDashboard" element={
        <PrivateRoute 
        allowedRoles={['scout']} user={user} userRole={userRole} loading={loading}>
        <ScoutDashboard />
        </PrivateRoute>
      } />

    </Routes>
    </>
  )
}

export default App
