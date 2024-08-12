import { useLocation } from "react-router";

const Header = () => {
    const location = useLocation();
  
    // Determine the header title based on the current route
    const getHeaderTitle = () => {
      switch (location.pathname) {
        case '/':
          return 'Contact Page';
        case '/charts-maps':
          return 'Charts and Maps Page';
        default:
          return 'Contact Page';
      }
    };

    return ( 
    <header className="w-full h-16 bg-[#228] p-4 text-white">
        <h2 className="text-2xl font-bold text-center">{getHeaderTitle()}</h2>
        </header>)
}

export default Header