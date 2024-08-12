import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9ECEE] text-white p-4">
      <div className="text-center bg-[#3E418D] p-6 rounded-md shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4">Page not found.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#44B] text-white py-2 px-4 rounded-md transition transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound
