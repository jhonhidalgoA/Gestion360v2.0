import { useNavigate } from "react-router-dom";
import NavbarSection from "@/components/navbar/NavbarSection";

const SchedulePageAdmin = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/administrador");    
  return (
     <div>
      <NavbarSection
        sectionKey="schedule"
        context="admin"
        handleBack={handleBack}
      />
    </div>
  )
}

export default SchedulePageAdmin