import { Check } from "lucide-react";
import "./Stepper.css";

const Stepper = ({ steps, currentStep, className = "" }) => {
  return (
     <div className={`stepper-container ${className}`}>
      <div className="stepper">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div className="stepper__item" key={step.id}>
              <div className="stepper__node-wrap">
                <div
                  className={
                    "stepper__node" +
                    (isCompleted ? " stepper__node--done" : "") +
                    (isActive ? " stepper__node--active" : "")
                  }
                >
                  {isCompleted ? <Check size={14} strokeWidth={2} /> : step.id}
                </div>

                <span
                  className={
                    "stepper__label" +
                    (isActive ? " stepper__label--active" : "")
                  }
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={
                    "stepper__connector" +
                    (step.id < currentStep ? " stepper__connector--done" : "")
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
