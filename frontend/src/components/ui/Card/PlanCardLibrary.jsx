import {state_label} from '@/data/DBdataSimulation'

import './PlanCardLibrary.css'

const PlanCardLibrary = ({ plan, onEditar, onVerDetalle }) => {
  return (
     <div className="library-card">
      <div className="library-card__header">
        <div className="library-card__lead">
          <div className="misplanes-card__icon">
            <span className="material-symbols-outlined">{plan.icon}</span>
          </div>
          <div>
            <div className="library-card__title">{plan.asignatura}</div>
            <div className="library-card__subtitle">Grupo:{plan.grupo}</div>
          </div>
        </div>
        <span className={`misplanes-badge misplanes-badge--${plan.estado}`}>
          {state_label[plan.estado]}
        </span>
      </div>

      <div className="misplanes-card__meta">
        <span className="material-symbols-outlined">calendar_today</span>
        {plan.actualizado}
      </div>

      <div className="misplanes-card__actions">
        <button type="button" onClick={() => onEditar(plan.id)}>
          Editar
        </button>
        <button type="button" onClick={() => onVerDetalle(plan.id)}>
          Ver detalle
        </button>
      </div>
    </div>
  )
}

export default PlanCardLibrary