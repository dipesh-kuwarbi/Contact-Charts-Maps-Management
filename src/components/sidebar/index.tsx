import React from 'react'
import { FaAddressBook, FaChartLine } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

// Define the type for the props
interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 min-h-screen bg-[#3E418D] pt-4 ${
          isOpen ? 'w-58' : 'w-0'
        } md:w-58 transition-all duration-300 overflow-hidden md:static md:h-full`}
      >
        <nav className="flex flex-col space-y-4 mt-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md transition transform hover:scale-105 font-bold text-white text-1xl ${
                isActive
                  ? 'bg-[#44B] border-b-2 border-white'
                  : 'hover:bg-[#44B]'
              }`
            }
          >
            <FaAddressBook className="mr-2" />
            Contacts
          </NavLink>
          <NavLink
            to="/charts-maps"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md transition transform hover:scale-105 font-bold text-white text-1xl ${
                isActive
                  ? 'bg-[#44B] border-b-2 border-white'
                  : 'hover:bg-[#44B]'
              }`
            }
          >
            <FaChartLine className="mr-2" />
            Charts & Maps
          </NavLink>
        </nav>
      </aside>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 md:hidden p-2 bg-[#44B] rounded-full font-bold text-white text-2xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </>
  )
}

export default Sidebar
