import LOGO from "../assets/6TSSLOGO.png"

export default function Header(){
  return(
  <header className="bg-blue-600 p-4">
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <img src={LOGO} alt="6TSSLOGO" className="size-15" />
      <p className="text-white text-2xl font-semibold">Tobattendance</p>

    </div>
</header>)
}