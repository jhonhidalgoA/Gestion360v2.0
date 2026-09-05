import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { optionsMap, getStudentsByGroup } from "@/data/DBdataSimulation";
import { filterFormsData } from "@/data/filterFormsData";
import { reportsConfig, requirementLabels } from "@/data/reportData";

import { FaUndo } from "react-icons/fa";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import ReportCard from "@/components/ui/Card/ReportCard";
import Select from "@/components/ui/Select/Select";

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

  const grupoSeleccionado = useWatch({ control, name: "grupo" });
  const estudianteSeleccionado = useWatch({ control, name: "estudiante" });
  const periodoSeleccionado = useWatch({ control, name: "periodo" });
  const [studentOptions, setStudentOptions] = useState([]);

  const cardsHabilitadas = Boolean(
    grupoSeleccionado && estudianteSeleccionado && periodoSeleccionado
  );

  useEffect(() => {
    const loadStudents = async () => {
      if (!grupoSeleccionado) {
        setStudentOptions([]);
        setValue("estudiante", "");
        return;
      }

      try {
        const students = await getStudentsByGroup(grupoSeleccionado);
        setStudentOptions(
          students.map((s) => ({ value: s.id, label: s.nombre }))
        );
        setValue("estudiante", "");
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
        setStudentOptions([]);
      }
    };

    loadStudents();
  }, [grupoSeleccionado, setValue]);

  const handleReset = () => {
    reset(defaultValues);
    setStudentOptions([]);
  };

  return (
    <div className="report-page">
      <NavbarSection sectionKey="report" handleBack={handleBack} />
      <form onSubmit={() => {}}>
        <div className="report-container">
          <div className="report-main">
            <Coments text="Selecciona y completa los campos para visulizar los reportes disponibles." /> 
            
          </div>
          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => (
                  <Select
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    options={
                      field.id === "estudiante"
                        ? studentOptions
                        : optionsMap[field.optionsKey] ?? []
                    }
                    register={register}
                    error={errors[field.id]}
                    variant="square"
                    required={field.required}
                    disabled={
                      (field.id === "estudiante" && !grupoSeleccionado) ||
                      (field.id === "periodo" && !estudianteSeleccionado)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="report-button">
              <Button
                variant="outline-primary"
                type="button"
                icon={FaUndo}
                iconPosition="left"
                onClick={handleReset}
              >
                Restablecer selección
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