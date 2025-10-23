import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import { useEffect, useState } from "react"
import LeaderDashboard from "./pages/leaderDashboard"
import ScoutManagement from "./pages/ScoutManagement"
import Addleaders from "./pages/Addleader"
import ScoutDashboard from "./pages/scoutDashboard"
import type { User } from "@supabase/supabase-js"
import PrivateRoute from "./components/PrivateRoute"
import AuthHelper from "./Authhelper"

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState("")
  const [loading, setLoading] = useState(true)

  const [token, setToken] = useState({})

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if(storedToken){
      const data = JSON.parse(storedToken)
      setToken(data)
    }
    
    
  }, [])

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
          <LoginPage setToken={setToken}/>} />

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
