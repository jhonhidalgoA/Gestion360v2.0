import { useNavigate } from "react-router-dom";
import NavbarSection from "@/components/navbar/NavbarSection";

const GradePageAdmin = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/administrador");  
  return (
    <div>
      <NavbarSection
        sectionKey="grade"
        context="admin"
        handleBack={handleBack}
      />
    </div>
  )
}

export default GradePageAdmin