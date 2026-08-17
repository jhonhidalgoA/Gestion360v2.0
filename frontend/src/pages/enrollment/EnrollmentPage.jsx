import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { TbArrowRight, TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import { enrollmentData } from "@/data/enrollmentData";

import Navbar from "@/components/navbar/Navbar";

import "./EnrollmentPage.css";

const EnrollmentPage = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleContent = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleContent(id);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="section-admissions">
        <div className="bg-admissions" />
        <div className="hero-content-admissions">
          <span className="eyebrow-admissions">Proceso de admisión 2026</span>

          <div className="title-admissions">
            <h1>
              Todo lo que necesitas saber para formar parte de nuestra
              institución
            </h1>
            <div className="cta-group-admissions">
              <Button
                variant="new-request"
                shape="pill"
                width="uniform"
                size="md"                
                icon={TbArrowRight}
                onClick={() => navigate("/matricula/nueva")}
              >
                Iniciar solicitud
              </Button>
              <Button
                variant="outline-white" 
                shape="pill" 
                width="uniform"
                size="md" 
                icon={TbSearch} 
                iconPosition="left" 
                onClick={() => navigate("/matricula/seguimiento")}
              >
                Consultar solicitud
              </Button>
            </div>
          </div>
          <div className="admissions">
            {enrollmentData.map((item) => {
              const isExpanded = expanded === item.id;

              return (
                <div className="container-admissions" key={item.id}>
                  <div
                    className="header-admissions"
                    onClick={() => toggleContent(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-controls={`content-${item.id}`}
                    id={`header-${item.id}`}
                  >
                    <h2>
                      {item.id}. {item.title}
                    </h2>

                    <div
                      className={`toggle-icon ${isExpanded ? "rotated" : ""}`}
                      aria-hidden="true"
                    >
                      {isExpanded ? "−" : "+"}
                    </div>
                  </div>

                  <div
                    id={`content-${item.id}`}
                    role="region"
                    aria-labelledby={`header-${item.id}`}
                    className={`content-admissions ${
                      isExpanded ? "expanded" : ""
                    }`}
                  >
                    {item.paragraphs?.map((paragraph, index) => {
                      if (
                        item.highlight &&
                        paragraph.includes(item.highlight)
                      ) {
                        const [before, after] = paragraph.split(item.highlight);

                        return (
                          <p key={index}>
                            {before}
                            <span className="phone-number">
                              {item.highlight}
                            </span>
                            {after}
                          </p>
                        );
                      }
                      return <p key={index}>{paragraph}</p>;
                    })}
                    {item.list?.length > 0 && (
                      <ul>
                        {item.list.map((element, index) => (
                          <li key={index}>
                            <strong>{element.label}:</strong> {element.value}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
