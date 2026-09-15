import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

// Datos
import {  getStudentsByGroup } from "@/data/DBdataSimulation";
import { filterFormsData } from "@/data/filterFormsData";
import { reportsConfig, requirementLabels } from "@/data/reportData";

// Iconos
import { FaUndo, FaSpinner } from "react-icons/fa";

// Componentes compartidos
import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import ReportCard from "@/components/ui/Card/ReportCard";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada"; // ✅ Regla: Reutilizar componente de cascada

import "./ReportPage.css";

const ReportPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const handlers = {
    attendanceReport: () => navigate("/teacher/report/attendance"),
    performanceReport: () => navigate("/teacher/report/performance"),
    behaviorReport: () => navigate("/teacher/report/behavior"),
  };

  const fields = filterFormsData.reportes?.fields ?? [];

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  // ✅ Observar campos para habilitar tarjetas (asumiendo que los IDs son estos)
  const grupoSeleccionado = useWatch({ control, name: "grupo" });
  const estudianteSeleccionado = useWatch({ control, name: "estudiante" });
  const periodoSeleccionado = useWatch({ control, name: "periodo" });

  const [studentOptions, setStudentOptions] = useState([]);
  
  // ✅ Nuevo: Estado de carga para feedback visual (Regla: Estados de carga)
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const cardsHabilitadas = Boolean(
    grupoSeleccionado && estudianteSeleccionado && periodoSeleccionado
  );

  // ✅ Efecto optimizado para cargar opciones dinámicas
  useEffect(() => {
    const loadStudents = async () => {
      if (!grupoSeleccionado) {
        setStudentOptions([]);
        setValue("estudiante", ""); // ✅ FormFieldCascada también lo hace, pero esto asegura limpieza inicial
        setFetchError("");
        return;
      }

      setIsLoadingStudents(true);
      setFetchError("");

      try {
        const students = await getStudentsByGroup(grupoSeleccionado);
        setStudentOptions(students.map((s) => ({ value: s.id, label: s.nombre })));
        setValue("estudiante", ""); // Limpia el estudiante al cambiar de grupo
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
        setFetchError("No se pudieron cargar los estudiantes. Intente nuevamente.");
        setStudentOptions([]);
      } finally {
        setIsLoadingStudents(false);
      }
    };

    loadStudents();
  }, [grupoSeleccionado, setValue]);

  const handleReset = () => {
    reset(defaultValues);
    setStudentOptions([]);
    setFetchError("");
  };

  return (
    <div className="report-page">
      <NavbarSection sectionKey="report" handleBack={handleBack} />
      
      {/* ✅ Se elimina onSubmit vacío. Si es solo filtro reactivo, no necesita form wrapper, 
          pero se mantiene para consistencia con react-hook-form si se planea expandir */}
      <form onSubmit={(e) => e.preventDefault()}> 
        <div className="report-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para visualizar los reportes disponibles." />
            {/* ✅ Feedback de error visible para el usuario (Accesibilidad) */}
            {fetchError && (
              <div className="error-message" role="alert" style={{ color: "var(--color-error)", fontSize: "var(--fs-sm)", marginTop: "var(--space-2)" }}>
                {fetchError}
              </div>
            )}
          </div>

          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => {
                  // ✅ Inyectar opciones dinámicas si es el campo estudiante
                  const fieldWithOptions = 
                    field.id === "estudiante" 
                      ? { ...field, options: studentOptions, isLoading: isLoadingStudents } 
                      : field;

                  return (
                    <FormFieldCascada
                      key={field.id}
                      field={fieldWithOptions}
                      register={register}
                      errors={errors}
                      control={control}
                      setValue={setValue}
                    />
                  );
                })}
              </div>
            </div>

            <div className="report-button">
              <Button
                variant="outline-primary"
                type="button"
                icon={isLoadingStudents ? FaSpinner : FaUndo}
                iconPosition="left"
                onClick={handleReset}
                disabled={isLoadingStudents} // ✅ Prevenir reset durante carga
                className={isLoadingStudents ? "fa-spin" : ""} // Asumiendo que tu CSS soporta animación de icono
              >
                {isLoadingStudents ? "Procesando..." : "Restablecer selección"}
              </Button>
            </div>
          </div>

          <div className="report-grid">
            {reportsConfig.map((reporte) => (
              <ReportCard
                key={reporte.id}
                icon={reporte.icon}
                title={reporte.title}
                subtitle={reporte.subtitle}
                iconColor={reporte.iconColor}
                format={reporte.format}
                category={reporte.category}
                requirements={reporte.requirements}
                requirementLabels={requirementLabels}
                action={reporte.action}
                disabled={!cardsHabilitadas}
                onClick={cardsHabilitadas ? handlers[reporte.handlerKey] : undefined}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportPage;