import { Check } from 'lucide-react';
import './EnrollmentStepper.css';

const STEPS = [
  { id: 1, label: 'Estudiante' },
  { id: 2, label: 'Acudiente' },
  { id: 3, label: 'Documentos' },
  { id: 4, label: 'Revisión' },
];


function EnrollmentStepper({ currentStep }) {
  return (
    <div className="enrollment-stepper">
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div className="enrollment-stepper__item" key={step.id}>
            <div className="enrollment-stepper__node-wrap">
              <div
                className={
                  'enrollment-stepper__node' +
                  (isCompleted ? ' enrollment-stepper__node--done' : '') +
                  (isActive ? ' enrollment-stepper__node--active' : '')
                }
              >
                {isCompleted ? <Check size={14} strokeWidth={2} /> : step.id}
              </div>
              <span
                className={
                  'enrollment-stepper__label' +
                  (isActive ? ' enrollment-stepper__label--active' : '')
                }
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={
                  'enrollment-stepper__connector' +
                  (step.id < currentStep ? ' enrollment-stepper__connector--done' : '')
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EnrollmentStepper;
