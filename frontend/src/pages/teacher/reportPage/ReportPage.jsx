import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { optionsMap } from "@/data/optionsData";
import { filterFormsData } from "@/data/filterFormsData";
import { reportsConfig, requirementLabels } from "@/data/reportData";

import { FaUndo, FaThumbtack } from "react-icons/fa";

import NavbarSection from "@/components/navbar/NavbarSection";
import ReportCard from "@/components/ui/Card/ReportCard";
import { Button } from "@/components/ui/Button/Button";
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
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <>
      <NavbarSection sectionKey="report" handleBack={handleBack} />
      <form onSubmit>
        <div className="report-container">
          <div className="report-main">
            <span>
              <FaThumbtack className="pin-icon" /> Completa los filtros para
              visualizar los reportes disponibles.
            </span>
          </div>
          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">
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
                onClick={handlers[reporte.handlerKey]}
              />
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default ReportPage;
