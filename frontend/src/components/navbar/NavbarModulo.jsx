import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { roleConfig, defaultRoleConfig, userMenuActions } from "@/data/navbarModuloData";
import Modal from "@/components/ui/Modal/Modal";
import logo from "../../icons/espiral.svg";

import "./NavbarModulo.css";

const NavbarModulo = () => {
  const { user } = useContext(AuthContext);
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
    // TODO: reemplazar por logout() real del AuthContext cuando esté conectado a la BD
    window.location.href = "/";
  };

  return (
    <nav className="navbar-modulo">
      <div className="nav-logo">
        <img src={logo} alt="logo" className="logo" />
        <div className="nav-logo-text">
          <h3>Gestión 360</h3>
          <p>Módulo {currentRole.moduleLabel}</p>
        </div>
      </div>

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
            <span className="user-name">
              {/* Placeholder: cuando el login esté conectado a la BD, reemplazar por user?.fullName */}
              {user?.fullName || "Jhon Fredy Hidalgo Arango"}
            </span>
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
