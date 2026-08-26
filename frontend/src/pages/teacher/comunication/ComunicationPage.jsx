import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { FaThumbtack, FaPen } from "react-icons/fa";
import { TbEye, TbCheck } from "react-icons/tb";
import { FaRegComments } from "react-icons/fa6";

import { mockData, getEstudiantesByGrupo } from "@/data/mockData";
import { stepperData } from "@/data/stepperData";
import { messageData } from "@/data/messageData";
import { filterFormsData } from "@/data/filterFormsData";
import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import ChannelGrid from "@/pages/teacher/comunication/ChannelGrid";
import Modal from "@/components/ui/Modal/Modal";
import MessagePreviewContent from "./MessagePreviewContent";

import "./ComunicationPage.css";

const optionsSourceMap = {
  grados: mockData.grados.map((g) => ({ value: g.id, label: g.nombre })),
};

const ComunicationPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");
  const { rows } = filterFormsData.comunication;

  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [estudiantesOptions, setEstudiantesOptions] = useState([]);
  const [loadingEstudiantes, setLoadingEstudiantes] = useState(false);

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      grupo: "",
      estudiante: "",
    },
  });
  const values = useWatch({ control });

  useEffect(() => {
    if (!values.grupo) return;

    let cancelado = false;

    const cargarEstudiantes = async () => {
      setLoadingEstudiantes(true);
      const data = await getEstudiantesByGrupo(values.grupo);

      if (cancelado) return;

      setEstudiantesOptions([
        { value: "todos", label: "Todo el grupo" },
        ...data.map((e) => ({
          value: e.id,
          label: `${e.apellidos} ${e.nombres}`,
        })),
      ]);
      setValue("estudiante", "");
      setLoadingEstudiantes(false);
    };

    cargarEstudiantes();

    return () => {
      cancelado = true;
    };
  }, [values.grupo, setValue]);

  const opcionesEstudianteVisibles = values.grupo ? estudiantesOptions : [];

  const destinatariosOk = Boolean(values.grupo) && Boolean(values.estudiante);
  const mensajeOk = destinatariosOk && message.trim().length > 0;
  const canalOk = mensajeOk && selectedChannels.length > 0;
  const currentStep = !destinatariosOk ? 1 : !mensajeOk ? 2 : !canalOk ? 3 : 4;

  const grupoLabel = optionsSourceMap.grados.find(
    (g) => g.value === values.grupo,
  )?.label;

  const estudianteLabel = estudiantesOptions.find(
    (e) => e.value === values.estudiante,
  )?.label;

  const destinatarioTexto = !destinatariosOk
    ? ""
    : values.estudiante === "todos"
      ? `Todo el grupo - ${grupoLabel}`
      : `${estudianteLabel} - ${grupoLabel}`;

  const handleTemplateSelect = (templateId) => {
    const template = messageData.find((t) => t.id === templateId);
    setSelectedTemplate(templateId);
    setMessage(template ? template.content : "");
  };

  const handlePreview = () => setPreviewOpen(true);

  const handleConfirmSend = () => {
    const destinatarios =
      values.estudiante === "todos" ? "grupo_completo" : [values.estudiante];
    // TODO: conectar con el envío real (API)
    console.log(
      "Enviar a:",
      destinatarios,
      "Canales:",
      selectedChannels,
      "Mensaje:",
      message,
    );
    setPreviewOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    handlePreview();
  };

  return (
    <>
      <NavbarSection sectionKey="comunicacion" handleBack={handleBack} />
      <Stepper
        className="comunication-stepper"
        steps={stepperData.comunication}
        currentStep={currentStep}
      />
      <div className="comunication-container">
        <div className="report-main">
          <span>
            <FaThumbtack className="pin-icon" />
            Completa los filtros y selecciona los canales para enviar los
            mensajes.
          </span>
        </div>

        <form onSubmit={handleSend} noValidate>
          <div className="comunication-grid">
            <div className="comunication-left">
              {rows.map((row) => {
                const Icon = row.icon;
                return (
                  <div className="comunication-section" key={row.id}>
                    {row.title && (
                      <div className="comunication-subtitle">
                        {Icon && <Icon className="comunication-icon" />}
                        <span>{row.title}</span>
                      </div>
                    )}

                    {row.id === "destinatarios" && (
                      <div className="filters-card">
                        <div className="form-row">
                          {row.fields.map((field) => (
                            <Select
                              key={field.id}
                              label={field.label}
                              name={field.id}
                              options={optionsSourceMap[field.optionsKey]}
                              register={register}
                              error={errors[field.id]}
                              variant="square"
                              required={field.required}
                              placeholder={field.placeholder}
                            />
                          ))}

                          <div className="bagde-field">
                            <Select
                              label="Estudiante:"
                              name="estudiante"
                              options={opcionesEstudianteVisibles}
                              register={register}
                              error={errors.estudiante}
                              variant="square"
                              required
                              disabled={!values.grupo || loadingEstudiantes}
                              placeholder={
                                loadingEstudiantes
                                  ? "Cargando..."
                                  : "Seleccione una opción"
                              }
                            />
                            {destinatariosOk && (
                              <div className="bagde-pill">
                                <TbCheck aria-hidden="true" />
                                <span>
                                  {values.estudiante === "todos"
                                    ? `${estudiantesOptions.length - 1} destinatarios seleccionados`
                                    : "1 destinatario seleccionado"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {row.id === "mensaje" && (
                      <>
                        <div className="filtes-card">
                          <Select
                            label="Usar plantilla (opcional)"
                            placeholder="Mensaje personalizado"
                            options={messageData.map((t) => ({
                              value: t.id,
                              label: t.name,
                            }))}
                            value={selectedTemplate}
                            onChange={(e) =>
                              handleTemplateSelect(e.target.value)
                            }
                            variant="square"
                          />
                          <Textarea
                            label="Mensaje"
                            name="mensaje"
                            placeholder="Escribe tu mensaje aquí..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                          />
                        </div>

                        <div className="comunication-buttons">
                          <Button
                            type="button"
                            variant="outline-primary"
                            icon={TbEye}
                            iconPosition="left"
                            onClick={handlePreview}
                            disabled={!canalOk}
                          >
                            Vista Previa
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="comunication-right">
              <div className="comunication-subtitle">
                <FaRegComments className="comunication-icon" />
                <span>CANAL DE ENVÍO</span>
              </div>

              <div className="comunication-channels">
                <span>
                  Selecciona uno o varios canales para enviar el mensaje.
                </span>

                <ChannelGrid
                  className="channels-grid"
                  selected={selectedChannels}
                  onChange={setSelectedChannels}
                  disabled={!mensajeOk}
                />

                {selectedChannels.length > 0 && (
                  <div className="channels-summary">
                    <b> {selectedChannels.length} </b> canal(es) seleccionado(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onConfirm={handleConfirmSend}
        variant="preview"
        secondaryText="Editar mensaje"
        secondaryIcon={FaPen} 
      >
        <MessagePreviewContent
          destinatario={destinatarioTexto}
          canales={selectedChannels}
          mensaje={message}
          
        />
      </Modal>
    </>
  );
};

export default ComunicationPage;
