import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-primary text-white px-10 py-4 shadow-md flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">
        Data Manager
      </Link>
    </header>
  )
}

export default Header