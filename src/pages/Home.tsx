import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaAddressBook, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#114] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-[#114] hidden md:flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md transition transform hover:scale-105 ${
                isActive ? 'bg-[#228] border-b-2 border-white' : 'hover:bg-[#228]'
              }`
            }
          >
            <FaAddressBook className="mr-2" />
            Contacts
          </NavLink>
          <NavLink
            to="/charts-maps"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md transition transform hover:scale-105 ${
                isActive ? 'bg-[#228] border-b-2 border-white' : 'hover:bg-[#228]'
              }`
            }
          >
            <FaChartLine className="mr-2" />
            Charts & Maps
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Welcome to the Dashboard</h2>
        </header>
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
