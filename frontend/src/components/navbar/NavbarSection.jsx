import { useState } from "react";
import { useAuth } from "@/components/hooks/useAuth";
import { navbarSectionData } from "@/data/navbarSectionData";
import Modal from "@/components/ui/Modal/Modal";
import "./NavbarSection.css";

const NavbarSection = ({ sectionKey, handleBack }) => {
  const { logout } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const data = navbarSectionData.teacher[sectionKey];
  const { title, color } = data;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar-section" style={{ backgroundColor: color }}>
      <button className="navs-section__btn" onClick={handleBack}>
        <span className="material-symbols-outlined icons-section">
          arrow_back
        </span>
      </button>

      <div className="navbar-content">
        <h2>{title}</h2>
        <p>Sistema de Gestión Administrativa y Procesos Académicos</p>
      </div>

      <button
        className="navs-section__btn logout-btn"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <span className="material-symbols-outlined icons-section">logout</span>
      </button>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        variant="logout"
      />
    </nav>
  );
};

export default NavbarSection;
