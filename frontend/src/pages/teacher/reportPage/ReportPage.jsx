import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaFileDownload } from "react-icons/fa";

import NavbarSection from "@/components/navbar/NavbarSection";
import ReportCard from "@/components/ui/Card/ReportCard";
import { Button } from "@/components/ui/Button/Button";
import Select from "@/components/ui/Select/Select";
import { optionsMap } from "@/data/optionsData";
import { filterFormsData } from "@/data/filterFormsData";
import { reportsConfig } from "@/data/reportData";

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

  const [loading, setLoading] = useState({ generar: false });

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const onGenerar = (data) => {
    setLoading((prev) => ({ ...prev, generar: true }));
    console.log("Generar reporte:", data);
    setTimeout(() => setLoading((prev) => ({ ...prev, generar: false })), 1000);
  };

  return (
    <>
      <NavbarSection sectionKey="report" handleBack={handleBack} />
      <form onSubmit={handleSubmit(onGenerar)}>
        <div className="report-container">
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
          <div className="report-grid">
            {reportsConfig.map((reporte) => (
              <ReportCard
                key={reporte.id}
                icon={reporte.icon}
                title={reporte.title}
                subtitle={reporte.subtitle}
                iconColor={reporte.iconColor}
                onClick={handlers[reporte.handlerKey]}
              />
            ))}
          </div>

          <div className="reports-button">
            <Button
              type="submit"
              variant="save"
              icon={FaFileDownload}
              iconPosition="left"
              disabled={loading.generar}
            >
              {loading.generar ? "Generando..." : "Generar Reporte"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ReportPage;
