import { useNavigate } from "react-router-dom";
import NavbarSection from "@/components/navbar/NavbarSection";

const EnrollmentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/administrador");

  return (
    <div>
      <NavbarSection
        sectionKey="enrollment"
        context="admin"
        handleBack={handleBack}
      />
    </div>
  );
};

export default EnrollmentPage;