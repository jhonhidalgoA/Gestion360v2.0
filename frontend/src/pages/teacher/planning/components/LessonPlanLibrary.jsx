import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { optionsMap, planLibrary } from "@/data/DBdataSimulation";
import { filterFormsData } from "@/data/filterFormsData";

import { FaPlus } from "react-icons/fa";
import { TbSearch } from "react-icons/tb";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Select from "@/components/ui/Select/Select";
import Input from "@/components/ui/Input/Input";
import PlanCardLibrary from "@/components/ui/Card/PlanCardLibrary";

import "./LessonPlanLibrary.css";

const LessonPlanLibrary = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/planningPage");

  const fields = filterFormsData.planLibrary?.fields ?? [];

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});

  const {
    register,
    control,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const grupoSeleccionado = useWatch({ control, name: "grupo" });
  const estadoSeleccionado = useWatch({ control, name: "estado" });

  const handleNuevoPlan = () => navigate("/LessonPlanPage");
  const handleEditar = (id) => navigate(`/LessonPlanPage/${id}`);
  const handleVerDetalle = (id) => navigate(`/ver-planes/${id}`);

  const planesFiltrados = planLibrary.filter((plan) => {
    const coincideGrupo = grupoSeleccionado
      ? plan.grupo === grupoSeleccionado
      : true;
    const coincideEstado = estadoSeleccionado
      ? plan.estado === estadoSeleccionado
      : true;
    return coincideGrupo && coincideEstado;
  });

  return (
    <div className="planLibrary-page">
      <NavbarSection sectionKey="planeacion" handleBack={handleBack} />
      <form onSubmit={() => {}}>
        <div className="planLibrary-container">
          <div className="assessment-header">
            <div className="filter-card">
              <div className="form-row">
                <Input
                  name="searchPlan"
                  label="Buscar:"
                  leftIcon={TbSearch}
                  placeholder="Buscar plan por tema o grupo"
                  wrapperClassName="planLibrary-search"
                  variant="square"
                />
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
               <div className="assessment-button">
                <Button
                  variant="primary"
                  type="button"
                  icon={FaPlus}
                  iconPosition="left"
                  className="btn-uniform-width"
                  onClick={handleNuevoPlan}
                >
                  Nuevo plan
                </Button>
              </div>
            </div>
          </div>

          <div className="planLibrary-grid">
            {planesFiltrados.map((plan) => (
              <PlanCardLibrary
                key={plan.id}
                plan={plan}
                onEditar={handleEditar}
                onVerDetalle={handleVerDetalle}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LessonPlanLibrary;
