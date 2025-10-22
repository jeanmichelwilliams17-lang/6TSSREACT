import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import { useEffect, useState } from "react"
import LeaderDashboard from "./pages/leaderDashboard"
import ScoutManagement from "./pages/ScoutManagement"
import Addleaders from "./pages/Addleader"
import ScoutDashboard from "./pages/scoutDashboard"

function App() {

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
    <Routes>
      <Route path="/login" element={<LoginPage setToken={setToken}/>} />
      <Route path="/leaderDashboard" element={<LeaderDashboard />} />
      <Route path="/leaderDashboard/managescouts" element={<ScoutManagement />} />
      <Route path="/leaderDashboard/addleaders" element={<Addleaders />} />
      <Route path="/scoutDashboard" element={<ScoutDashboard />} />
    </Routes>
  )
}

export default App
