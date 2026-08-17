import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import { FaThumbtack } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaPenToSquare, FaRegComments } from "react-icons/fa6";
import { TbEye, TbSend, TbCheck } from "react-icons/tb";

import { mockData, getEstudiantesByGrupo } from "@/data/mockData";
import { stepperData } from "@/data/stepperData";
import { messageData } from "@/data/messageData";
import { Button } from "@/components/ui/Button/Button";

import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import ChannelGrid from "@/pages/teacher/comunication/ChannelGrid";

import "./ComunicationPage.css";

const ComunicationPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/teacher");

  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([]);

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

  const handleTemplateSelect = (templateId) => {
    const template = messageData.find((t) => t.id === templateId);
    setSelectedTemplate(templateId);
    setMessage(template ? template.content : "");
  };

  const handlePreview = () => {
    // TODO: abrir modal de vista previa
    console.log({
      grupo: values.grupo,
      estudiante: values.estudiante,
      canales: selectedChannels,
      mensaje: message,
    });
  };

  const handleSend = () => {
    const destinatarios =
      values.estudiante === "todos" ? "grupo_completo" : [values.estudiante];
    console.log(
      "Enviar a:",
      destinatarios,
      "Canales:",
      selectedChannels,
      "Mensaje:",
      message,
    );
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
        <div className="comunication-grid">
          <div className="comunication-left">
            <div className="comunication-section">
              <div className="comunication-subtitle">
                <FiUsers className="comunication-icon" />
                <span>DESTINATARIOS</span>
              </div>

              <div className="filter-card">
                <div className="form-row">
                  <Select
                    label="Grupo:"
                    name="grupo"
                    options={mockData.grados.map((g) => ({
                      value: g.id,
                      label: g.nombre,
                    }))}
                    register={register}
                    error={errors.grupo}
                    variant="square"
                    required
                    placeholder="Seleccione un grupo"
                  />
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
            </div>
            <div className="comunication-section">
              <div className="comunication-subtitle">
                <FaPenToSquare className="comunication-icon" />
                <span>MENSAJE</span>
              </div>

              <div className="filter-card">
                <Select
                  label="Usar plantilla (opcional)"
                  placeholder="Mensaje personalizado"
                  options={messageData.map((t) => ({
                    value: t.id,
                    label: t.name,
                  }))}
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
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
                >
                  Vista Previa
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  icon={TbSend}
                  iconPosition="left"
                  onClick={handleSend}
                  disabled={!canalOk}
                >
                  Enviar Mensaje
                </Button>
              </div>
            </div>
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
      </div>
    </>
  );
};

export default ComunicationPage;
