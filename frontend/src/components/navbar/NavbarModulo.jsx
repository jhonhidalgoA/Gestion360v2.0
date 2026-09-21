import { useState, useMemo } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/components/hooks/useAuth";
import { useClickOutside } from "@/components/hooks/useClickOutside";
import {
  roleConfig,
  defaultRoleConfig,
  userMenuActions,
  sectionLabels,
} from "@/data/navbarModuloData";
import Modal from "@/components/ui/Modal/Modal";
import EditProfile from "@/pages/common/EditProfile";
import logo from "@/assets/icons/espiral.svg";

import "./NavbarModulo.css";

const getInitials = (fullName = "") =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

// Agrupa las keys de menuItems por su "section" respetando el orden en que llegan.
const groupBySection = (menuItems) => {
  const groups = [];
  menuItems.forEach((key) => {
    const item = userMenuActions[key];
    if (!item) return;
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.section === item.section) {
      lastGroup.items.push(key);
    } else {
      groups.push({ section: item.section, items: [key] });
    }
  });
  return groups;
};

const NavbarModulo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const currentRole = roleConfig[user?.role] ?? defaultRoleConfig;
  const initials = useMemo(() => getInitials(user?.fullName), [user?.fullName]);
  const sectionGroups = useMemo(
    () => groupBySection(currentRole.menuItems),
    [currentRole.menuItems],
  );

  useClickOutside(
    [".nav-user-btn", ".user-menu-dropdown"],
    () => setIsUserMenuOpen(false),
    isUserMenuOpen,
  );

  const handleMenuItemClick = (item) => {
    setIsUserMenuOpen(false);

    if (item.type === "panel") {
      setIsEditProfileOpen(true);
      return;
    }

    navigate(item.to);
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
                <div className="user-menu-avatar" aria-hidden="true">
                  {initials}
                </div>
                <div className="user-menu-header-text">
                  <p className="user-full-name">{user?.fullName}</p>
                  <p className="user-email">
                    {user?.correo || "usuario@ejemplo.com"}
                  </p>
                </div>
              </div>

              <div className="user-menu-actions-vertical">
                {sectionGroups.map((group) => (
                  <div className="user-menu-section" key={group.section}>
                    <p className="user-menu-section-label">
                      {sectionLabels[group.section]}
                    </p>
                    {group.items.map((key) => {
                      const item = userMenuActions[key];
                      return (
                        <div
                          key={key}
                          className={item.cName}
                          onClick={() => handleMenuItemClick(item)}
                        >
                          <span
                            className={`icon-badge icon-badge--${item.accent}`}
                          >
                            <span className="material-symbols-outlined">
                              {item.icon}
                            </span>
                          </span>
                          <p>{item.title}</p>
                          <span
                            className="material-symbols-outlined chevron-hint"
                            aria-hidden="true"
                          >
                            chevron_right
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
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

      <EditProfile
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </nav>
  );
};

export default NavbarModulo;