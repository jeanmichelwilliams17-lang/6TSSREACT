import LOGO from "../assets/6TSSLOGO.png"

export default function ScoutHeader(){

return(

<header className="bg-blue-600 p-4">
  <div className="max-w-7xl  flex justify-between items-center">
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <img src={LOGO} alt="6TSSLOGO" className="size-15" />
      <p className="text-white text-2xl font-semibold">Tobattendance</p>
    </div>
    
    <nav>
      <ul className="flex space-x-6">
        <li><a href="/scoutDashboard" className="text-white hover:text-gray-300">Dashboard</a></li>
      </ul>
    </nav>
  </div>
</header>

)
}