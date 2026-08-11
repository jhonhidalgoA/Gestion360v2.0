import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { optionsMap } from "@/data/optionsData";
import { filterFormsData } from "@/data/filterFormsData";

import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";

import "./ComunicationPage.css";

const ComunicationPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");
  const { fields } = filterFormsData.comunication;

  const {
    register,

    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <>
      <NavbarSection sectionKey="comunicacion" handleBack={handleBack} />
      <div className="comunication-container">
        <div className="comunication-grid">
          <div className="comunication-left">
            <div className="report-main">
              <h4>Registro de Comunicaciones</h4>
              <span>
                Selecciona los campos en orden para habilitar las
                comunicaciones.
              </span>
            </div>
            <div className="filter-card">
              <div className="form-row">
                {fields.map((field) => (
                  <Select
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    options={optionsMap[field.optionsKey]}
                    register={register}
                    error={errors[field.id]}
                    variant="square"
                    required={field.required}
                  />
                ))}
              </div>
            </div>
            <div className="comunication-card">
               <h3>Escribir Mensaje</h3>
            </div>
          </div>
          <div className="comunication-right">
            <h3>Canales de comunicacíon</h3>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ComunicationPage;
