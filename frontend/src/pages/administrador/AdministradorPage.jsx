import { useState } from "react";
import NavbarModulo from "@/components/navbar/NavbarModulo";
import AdminCard from "@/components/ui/Card/AdminCard";
import { moduleData } from "@/data/moduleData";
import Input from "@/components/ui/Input/Input";
import { TbSearch } from "react-icons/tb";

import "./AdministradorPage.css";

const AdministradorPage = () => {
  // 1. Cambiado a searchAdmin
  const [searchAdmin, setSearchAdmin] = useState("");

  const fechaActual = new Date()
    .toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/^./, (letra) => letra.toUpperCase());

  const secciones = moduleData.admin;

  const seccionesFiltradas = Object.values(secciones)
    .map((seccion) => {
      const itemsFiltrados = seccion.items.filter((item) =>
        item.title.toLowerCase().includes(searchAdmin.toLowerCase()),
      );
      return { ...seccion, items: itemsFiltrados };
    })
    .filter((seccion) => seccion.items.length > 0);

  return (
    <>
      <NavbarModulo />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Bienvenido Administrador</h1>
          <p className="current-date">{fechaActual}</p>
        </div>
        <div className="admin-search">
          <Input
            name="searchAdmin"
            leftIcon={TbSearch}
            placeholder="¿Qué necesitas gestionar hoy?"
            wrapperClassName="admin-search-input"
            variant="square"
            value={searchAdmin}
            onChange={(e) => setSearchAdmin(e.target.value)}
          />
        </div>
        <div className="admin-content">
          {seccionesFiltradas.map((seccion) => (
            <section key={seccion.label} className="admin-section">
              <h2
                className="section-title"
                style={{ borderLeftColor: seccion.accentColor }}
              >
                {seccion.label}
              </h2>
              <div className="admin-grid">
                {seccion.items.map((item) => (
                  <AdminCard key={item.id} item={item} color={seccion.color} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdministradorPage;
