import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { FaPen } from "react-icons/fa";
import { TbEye } from "react-icons/tb";

import { optionsMap, getStudentsByGroup } from "@/data/DBdataSimulation";
import { stepperData } from "@/data/stepperData";
import { messageData } from "@/data/messageData";
import { filterFormsData } from "@/data/filterFormsData";

import { Button } from "@/components/ui/Button/Button";
import NavbarSection from "@/components/navbar/NavbarSection";
import Coments from "@/components/ui/Coments/Coments";
import Stepper from "@/components/ui/Stepper/Stepper";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import ChannelGrid from "@/pages/teacher/comunication/ChannelGrid";
import Modal from "@/components/ui/Modal/Modal";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";
import MessagePreviewContent from "./MessagePreviewContent";

import "./ComunicationPage.css";

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

  const grupoValue = useWatch({ control, name: "grupo" });
  const estudianteValue = useWatch({ control, name: "estudiante" });

  useEffect(() => {
    if (!grupoValue) return;

    let cancelado = false;

    const cargarEstudiantes = async () => {
      setLoadingEstudiantes(true);
      const data = await getStudentsByGroup(grupoValue);

      if (cancelado) return;

      setEstudiantesOptions([
        { value: "todos", label: "Todo el grupo" },
        ...data.map((e) => {
          const [nombres, ...apellidosArr] = e.nombre.split(" ");
          return {
            value: String(e.id), // ✅ el <select> siempre devuelve string
            label: `${apellidosArr.join(" ")} ${nombres}`,
          };
        }),
      ]);
      setValue("estudiante", "");
      setLoadingEstudiantes(false);
    };

    cargarEstudiantes();

    return () => {
      cancelado = true;
    };
  }, [grupoValue, setValue]);

  const destinatariosOk = Boolean(grupoValue) && Boolean(estudianteValue);
  const mensajeOk = destinatariosOk && message.trim().length > 0;
  const canalOk = mensajeOk && selectedChannels.length > 0;
  const currentStep = !destinatariosOk ? 1 : !mensajeOk ? 2 : !canalOk ? 3 : 4;

  const grupoLabel = optionsMap.grupos.find(
    (g) => g.value === grupoValue,
  )?.label;

  const estudianteLabel = estudiantesOptions.find(
    (e) => e.value === estudianteValue,
  )?.label;

  const destinatarioTexto = !destinatariosOk
    ? ""
    : estudianteValue === "todos"
      ? `Todo el grupo - ${grupoLabel}`
      : `${estudianteLabel} - ${grupoLabel}`;

  const handleTemplateSelect = (templateId) => {
    const template = messageData.find((t) => t.id === templateId);
    setSelectedTemplate(templateId);
    setMessage(template ? template.content : "");
  };

  const handlePreview = () => setPreviewOpen(true);

  const handleConfirmSend = () => {
    setPreviewOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    handlePreview();
  };

  return (
    <div className="comunication-page">
      <NavbarSection sectionKey="comunicacion" handleBack={handleBack} />

      <Stepper
        className="comunication-stepper"
        steps={stepperData.comunication}
        currentStep={currentStep}
      />

      <div className="comunication-container">
        <div className="report-main">
          <Coments text="Selecciona y completa los campos para enviar los mensajes." />
        </div>

        <form onSubmit={handleSend} noValidate>
          <div className="comunication-grid">
            <div className="comunication-left">
              {rows.map((row) => (
                <div className="comunication-section" key={row.id}>
                  {row.title && (
                    <div className="form-section-title">
                      <span className="form-section-title__badge">
                        {row.number}
                      </span>
                      <span className="form-section-title__text">
                        {row.title}
                      </span>
                    </div>
                  )}

                  {row.id === "destinatarios" && (
                    <div className="filters-card">
                      <div className="form-row">
                        <FormFieldCascada
                          field={row.fields[0]}
                          register={register}
                          errors={errors}
                          control={control}
                          setValue={setValue}
                        />

                        <FormFieldCascada
                          field={{
                            ...row.fields[1],
                            placeholder: loadingEstudiantes
                              ? "Cargando..."
                              : "Seleccione una opción",
                            options: estudiantesOptions,
                          }}
                          register={register}
                          errors={errors}
                          control={control}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                  )}

                  {row.id === "mensaje" && (
                    <>
                      <div className="filters-card">
                        <Select
                          label="Usar plantilla (opcional)"
                          placeholder={
                            !destinatariosOk
                              ? "Selecciona los destinatarios primero"
                              : "Mensaje personalizado"
                          }
                          options={messageData.map((t) => ({
                            value: t.id,
                            label: t.name,
                          }))}
                          value={selectedTemplate}
                          onChange={(e) => handleTemplateSelect(e.target.value)}
                          variant="square"
                          disabled={!destinatariosOk}
                        />

                        <Textarea
                          label="Mensaje"
                          name="mensaje"
                          placeholder={
                            !destinatariosOk
                              ? "Selecciona los destinatarios primero"
                              : "Escribe tu mensaje aquí..."
                          }
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          disabled={!destinatariosOk}
                          aria-label="Cuerpo del mensaje a enviar"
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
              ))}
            </div>

            <div className="comunication-right">
              <div className="form-section-title">
                <span className="form-section-title__badge">3</span>
                <span className="form-section-title__text">Canal de envío</span>
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
                    <b>{selectedChannels.length}</b> canal(es) seleccionado(s)
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
    </div>
  );
};

export default ComunicationPage;