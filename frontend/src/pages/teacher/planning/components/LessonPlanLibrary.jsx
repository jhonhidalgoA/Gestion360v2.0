import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { optionsMap, planLibrary } from "@/data/DBdataSimulation";
import { filterFormsData } from "@/data/filterFormsData";

import { FaPlus, FaUndo } from "react-icons/fa";
import { TbSearch } from "react-icons/tb";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";
import Input from "@/components/ui/Input/Input";
import PlanCardLibrary from "@/components/ui/Card/PlanCardLibrary";

import "./LessonPlanLibrary.css";

const LessonPlanLibrary = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/planningPage");

  const fields = filterFormsData.planLibrary?.fields ?? [];

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  // ✅ 1. Estado local para la búsqueda (igual que searchStudent en ClassworkPage)
  const [searchPlan, setSearchPlan] = useState("");
  const [loading, setLoading] = useState({ reset: false });

  // ✅ 2. Observar solo los selects que necesitan filtrar
  const selectedGroup = useWatch({ control, name: "grupo" });
  const selectedSubject = useWatch({ control, name: "asignatura" });
  const selectedStatus = useWatch({ control, name: "estado" });

  const handleNewPlan = () => navigate("/LessonPlanPage");
  const handleEdit = (id) => navigate(`/LessonPlanPage/${id}`);
  const handleViewDetail = (id) => navigate(`/ver-planes/${id}`);

  // ✅ 3. Función para restablecer todo (incluyendo la búsqueda)
  const handleReset = () => {
    setLoading((prev) => ({ ...prev, reset: true }));
    setTimeout(() => {
      reset(defaultValues);
      setSearchPlan(""); // Limpiar estado de búsqueda
      setLoading((prev) => ({ ...prev, reset: false }));
    }, 300);
  };

  // ✅ 4. Filtrado idéntico al patrón de ClassworkPage
  const filteredPlans = planLibrary.filter((plan) => {
    // Búsqueda por texto (tema, grupo o asignatura)
    const matchesSearch = searchPlan
      ? plan.tema.toLowerCase().includes(searchPlan.toLowerCase()) ||
        plan.grupo.toLowerCase().includes(searchPlan.toLowerCase()) ||
        plan.asignatura.toLowerCase().includes(searchPlan.toLowerCase())
      : true;

    // Filtros por selects
    const matchesGroup = selectedGroup ? plan.grupo === selectedGroup : true;
    const matchesSubject = selectedSubject
      ? plan.asignatura === selectedSubject
      : true;
    const matchesStatus = selectedStatus
      ? plan.estado === selectedStatus
      : true;

    return matchesSearch && matchesGroup && matchesSubject && matchesStatus;
  });

  return (
    <div className="planLibrary-page">
       <NavbarSection sectionKey="planeacion" handleBack={handleBack} context="Mis planes de clase" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="planLibrary-container">
          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">               
                <Input
                  name="searchPlan"
                  label="Buscar:"
                  leftIcon={TbSearch}
                  placeholder="Buscar plan por tema o grupo"
                  wrapperClassName="planLibrary-search"
                  variant="square"
                  value={searchPlan}
                  onChange={(e) => setSearchPlan(e.target.value)}
                />

                {fields.map((field) => (
                  <Select
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    options={optionsMap[field.optionsKey] ?? []}
                    register={register}
                    error={errors[field.id]}
                    variant="square"
                    required={field.required}
                  />
                ))}
              </div>

              <div className="assessment-button">
                <Button
                  variant="primary"
                  type="button"
                  icon={FaPlus}
                  iconPosition="left"
                  className="btn-uniform-width"
                  onClick={handleNewPlan}
                >
                  Nuevo plan
                </Button>
                <Button
                  type="button"
                  variant="outline-primary"
                  icon={FaUndo}
                  iconPosition="left"
                  onClick={handleReset}
                  disabled={loading.reset}
                >
                  {loading.reset
                    ? "Restableciendo..."
                    : "Restablecer selección"}
                </Button>
              </div>
            </div>
          </div>

          <div className="planLibrary-grid">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => (
                <PlanCardLibrary
                  key={plan.id}
                  plan={plan}
                  onEditar={handleEdit}
                  onVerDetalle={handleViewDetail}
                />
              ))
            ) : (
              <div className="no-results">
                <span className="material-symbols-outlined">
                  filter_alt_off
                </span>
                <h3>No encontramos planes con estos filtros</h3>
                <span>
                  Prueba con otro grupo o asignatura, o crea un nuevo plan desde
                  cero.
                </span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LessonPlanLibrary;
