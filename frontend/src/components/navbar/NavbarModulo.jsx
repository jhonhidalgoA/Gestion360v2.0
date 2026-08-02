import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/components/hooks/useAuth";
import { useClickOutside } from "@/components/hooks/useClickOutside";
import { roleConfig, defaultRoleConfig, userMenuActions } from "@/data/navbarModuloData";
import Modal from "@/components/ui/Modal/Modal";
import logo from "@/assets/icons/espiral.svg";
import "./NavbarModulo.css";

const NavbarModulo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const currentRole = roleConfig[user?.role] ?? defaultRoleConfig;

  useClickOutside(
    [".nav-user-btn", ".user-menu-dropdown"],
    () => setIsUserMenuOpen(false),
    isUserMenuOpen
  );

  const handleMenuItemClick = (to) => {
    setIsUserMenuOpen(false);
    navigate(to);
  };

  

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar-modulo">
      <RouterLink to={currentRole.homePath} className="navbar-logo">
        <img src={logo} alt="logo" className="logo-icon" />
        <div className="nav-logo-text">
          <h3>
            Gestión <span className="danger">360</span>
          </h3>
          <p>Módulo {currentRole.moduleLabel}</p>
        </div>
      </RouterLink>

      <ul>
        <li className="nav-item">
          <button className="nav-icon-btn" aria-label="Notificaciones">
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
            <span className="notification-badge">3</span>
          </button>
        </li>

        <li className="nav-item no-pulse">
          <button
            className="nav-user-btn"
            aria-label="Menú de usuario"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <span className="user-name">{user?.fullName}</span>
          </button>

          {isUserMenuOpen && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <div>
                  <p className="user-role">{currentRole.roleTitle}</p>
                  <p className="user-email">{user?.correo || "usuario@ejemplo.com"}</p>
                </div>
              </div>
              <div className="user-menu-actions-vertical">
                {currentRole.menuItems.map((key) => {
                  const item = userMenuActions[key];
                  return (
                    <div
                      key={key}
                      className={item.cName}
                      onClick={() => handleMenuItemClick(item.to)}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </li>

        <li className="nav-item">
          <button
            className="nav-icon-btn"
            aria-label="Cerrar sesión"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <span className="icon material-symbols-outlined" aria-hidden="true">
              logout
            </span>
          </button>
        </li>
      </ul>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        variant="logout"
      />
    </nav>
  );
};

export default NavbarModulo;
