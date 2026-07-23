import { Link, useLocation } from 'react-router-dom';

const NavbarItem = ({ item, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === item.to;

  return (
    <li className="nav-item">
      <Link
        to={item.to}
        className={`nav-links ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default NavbarItem;