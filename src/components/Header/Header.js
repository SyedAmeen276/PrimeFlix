import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
   
    <div onClick={() => window.scroll(0, 0)} className="header">
     PrimeFlix
    
    <ul className="Navbar">
    <li className="navItem"><Link to="/"> Trending </Link> </li>
    <li className="navItem"><Link to="/movies"> Movies </Link></li>
    <li className="navItem"><Link to="/series"> Tv Series </Link> </li>
    <li className="navItem"><Link to="/Search"> search </Link> </li>

    </ul>
    </div>
    
  );
};

export default Header;
