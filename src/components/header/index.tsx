import { useLocation } from "react-router";

const Header:React.FC = () => {
    const location = useLocation();
  
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
        <header className="w-full h-16 bg-[#3E418D] p-4 font-bold text-white text-3xl">
            <h2 className="text-2xl font-bold text-center">{getHeaderTitle()}</h2>
        </header>
    )
}

export default Header