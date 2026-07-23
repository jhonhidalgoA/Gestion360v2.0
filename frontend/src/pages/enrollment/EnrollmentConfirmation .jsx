import { Check, Mail, Download, ArrowRight } from 'lucide-react';
import './EnrollmentConfirmation.css';

/**
 * Pantalla de confirmación tras enviar la solicitud de admisión.
 *
 * Props:
 * - studentName: string
 * - guardianEmail: string
 * - trackingCode: string
 * - onDownloadReceipt: () => void
 * - onViewStatus: () => void
 */
function EnrollmentConfirmation({
  studentName,
  guardianEmail,
  trackingCode,
  onDownloadReceipt,
  onViewStatus,
}) {
  const steps = [
    {
      title: 'Revisión de documentos',
      description:
        'El equipo de admisiones revisará tu solicitud en un plazo de 3 a 5 días hábiles.',
    },
    {
      title: 'Entrevista y valoración',
      description: 'Te contactaremos por correo o celular para agendar la cita.',
    },
    {
      title: 'Resultado de admisión',
      description: 'Podrás consultar el estado desde tu cuenta en cualquier momento.',
    },
  ];

  return (
    <div className="enrollment-confirmation">
      <div className="enrollment-confirmation__icon">
        <Check size={28} strokeWidth={2} />
      </div>

      <h3 className="enrollment-confirmation__title">Solicitud enviada</h3>
      <p className="enrollment-confirmation__subtitle">
        Hemos recibido la solicitud de admisión de {studentName}.
      </p>

      <div className="enrollment-confirmation__code-box">
        <span className="enrollment-confirmation__code-label">Número de radicado</span>
        <span className="enrollment-confirmation__code-value">{trackingCode}</span>
      </div>

      <div className="enrollment-confirmation__steps">
        <p className="enrollment-confirmation__steps-title">Próximos pasos</p>
        {steps.map((step, index) => (
          <div className="enrollment-confirmation__step" key={step.title}>
            <div className="enrollment-confirmation__step-number">{index + 1}</div>
            <div>
              <p className="enrollment-confirmation__step-title">{step.title}</p>
              <p className="enrollment-confirmation__step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="enrollment-confirmation__email-note">
        <Mail size={16} strokeWidth={2} />
        <p>Enviamos una copia de este número de radicado a {guardianEmail}.</p>
      </div>

      <div className="enrollment-confirmation__actions">
        <button
          type="button"
          className="enrollment-confirmation__btn enrollment-confirmation__btn--secondary"
          onClick={onDownloadReceipt}
        >
          <Download size={16} strokeWidth={2} />
          Descargar comprobante
        </button>
        <button
          type="button"
          className="enrollment-confirmation__btn enrollment-confirmation__btn--primary"
          onClick={onViewStatus}
        >
          Ver estado de mi solicitud
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default EnrollmentConfirmation;
