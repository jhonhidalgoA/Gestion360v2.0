import { state_label, optionsMap } from "@/data/DBdataSimulation";
import { Button } from "@/components/ui/Button/Button";
import { FaPen } from "react-icons/fa";
import { TbEye } from "react-icons/tb";

import "./PlanCardLibrary.css";

const PlanCardLibrary = ({ plan, onEditar, onVerDetalle }) => {
  const asignaturaLabel =
    optionsMap.asignaturas.find((a) => a.value === plan.asignatura)?.label ||
    plan.asignatura;

  const grupoLabel =
    optionsMap.grupos.find((g) => g.value === plan.grado)?.label || plan.grupo;

  const periodoLabel =
    optionsMap.periodos.find((p) => p.value === plan.periodo)?.label ||
    plan.periodo;

  const tipoLabel =
    optionsMap.typePlan.find((t) => t.value === plan.tipo)?.label || plan.tipo;

  return (
    <div className="library-card">
      <div className="library-card_header">
        <div className="library-card_lead">
          <div>
            <p>{asignaturaLabel}</p>
          </div>
          <div>
            <h2>{plan.tema}</h2>
          </div>
        </div>
        <span className={`misplanes-badge misplanes-badge--${plan.estado}`}>
          {state_label[plan.estado]}
        </span>
      </div>
      <div className="library-card_row">
        {plan.periodo && (
          <span className="metadata-text">
            Periodo: <strong>{periodoLabel}</strong>
          </span>
        )}
        <span className="metadata-text">
          Grado: <strong>{grupoLabel}</strong>
        </span>
        {plan.tipo && (
          <span className="metadata-text">
            Tipo: <strong>{tipoLabel}</strong>
          </span>
        )}
        {plan.fecha && (
          <span className="metadata-text">
            Fecha: <strong>{plan.fecha}</strong>
          </span>
        )}
      </div>

      <div className="library-card_footer">
        <span className="material-symbols-outlined">calendar_today</span>
        {plan.actualizado}
      </div>

       <div className="assessment-button">
        <Button
          variant="outline-primary"
          shape="rounded"
          size="sm"
          width="full"
          icon={FaPen}
          iconPosition="left"
          onClick={() => onEditar(plan.id)}
        >
          Editar
        </Button>
        <Button
          variant="outline-primary"
          shape="rounded"
          size="sm"
          width="full"
          icon={TbEye}
          iconPosition="left"
          onClick={() => onVerDetalle(plan.id)}
        >
          Ver detalle
        </Button>
      </div>
    </div>
  );
};

export default PlanCardLibrary;
