import { useState, useEffect, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

interface HomeProps {
    children?: ReactNode; // `children` is optional and can be any valid React node
  }

// Define the component with TypeScript
const Home: React.FC<HomeProps> = ({children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth >= 768) { // Example breakpoint for medium devices
      setSidebarOpen(true); // Keep the sidebar open on larger screens
    } else {
      setSidebarOpen(false); // Close the sidebar on smaller screens
    }
  };

  // Add resize event listener on mount
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Check initial window size
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          <div className="fade-in h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
