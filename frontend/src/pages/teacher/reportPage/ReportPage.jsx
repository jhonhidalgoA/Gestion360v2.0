import { useNavigate } from "react-router-dom";
import { reportsConfig } from "@/data/reportData";

import NavbarSection from "@/components/navbar/NavbarSection";
import ReportCard from "@/components/ui/Card/ReportCard";

import "./ReportPage.css";

const ReportPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const handlers = {
    attendanceReport: () => navigate("/teacher/report/attendance"),
    performanceReport: () => navigate("/teacher/report/performance"),
    behaviorReport: () => navigate("/teacher/report/behavior"),
  };

  return (
    <>
      <NavbarSection sectionKey="report" handleBack={handleBack} />
      
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
    </>
  );
};

export default ReportPage;
