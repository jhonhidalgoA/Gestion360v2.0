import { useNavigate } from "react-router-dom";

import NavbarSection from "@/components/navbar/NavbarSection";

const ClassworkPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  return (
    <>
      <NavbarSection sectionKey="tareas" handleBack={handleBack} />
      <div className="classwork-container">
        <div className="classwork-left">

        </div>
        <div className="classwork-right">

        </div>

      </div>
    </>
  );
};

export default ClassworkPage;
