import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            aiCurePath
          </Link>
          <div className="flex space-x-4">
            <Link to="/chat" className="text-gray-600 hover:text-gray-900">Chat</Link>
            <Link to="/health-plan" className="text-gray-600 hover:text-gray-900">Health Plan</Link>
            <Link to="/practitioners" className="text-gray-600 hover:text-gray-900">Practitioners</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}