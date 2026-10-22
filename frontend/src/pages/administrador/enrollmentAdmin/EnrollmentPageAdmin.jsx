import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

import { filterFormsData } from "@/data/filterFormsData";
import { groupsByGrade } from "@/data/DBdataSimulation";
import { stepperData } from "@/data/stepperData";
import { Button } from "@/components/ui/Button/Button";

import PhotoUpload from "@/components/ui/PhotoUpload/PhotoUpload";
import NavbarSection from "@/components/navbar/NavbarSection";
import Stepper from "@/components/ui/Stepper/Stepper";
import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";

import "./EnrollmentPageAdmin.css";

// Fecha en formato yyyy-mm-dd (el único que acepta <input type="date">)
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

// Función para generar código de matrícula
const generateEnrollmentCode = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `MAT-${year}-${random}`;
};

// Función para calcular edad desde una fecha yyyy-mm-dd
const calculateAge = (birthDateStr) => {
  if (!birthDateStr) return "";

  const [year, month, day] = birthDateStr.split("-").map(Number);
  if (!year || year < 1900) return "";

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 0 ? age.toString() : "";
};

const allFilled = (values) =>
  values.every((value) => String(value ?? "").trim() !== "");

const EnrollmentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/administrador");

  // Pantalla visible: 1 = Datos Estudiante, 2 = Información Matrícula, 3 = Información General,
  // 4 = Información del Padre, 5 = Información de la Madre, 6 = Contacto
  const [screen, setScreen] = useState(1);
  const totalSteps = 6;

  // Pantalla 1
  const { rows, sectionTitle, documentsSection } =
    filterFormsData.enrollmentStudent;
  const studentFields = rows.flatMap((row) => row.fields);

  // Pantalla 2
  const enrollmentInfo = filterFormsData.schedules;
  const infoFields = enrollmentInfo.sections
    .flatMap((section) => section.rows)
    .flatMap((row) => row.fields);

  // Pantalla 3
  const generalInfo = filterFormsData.general;
  const generalFields = generalInfo.sections
    .flatMap((section) => section.rows)
    .flatMap((row) => row.fields);

  // Pantalla 4
  const fatherInfo = filterFormsData.father;
  const fatherFields = fatherInfo.sections
    .flatMap((section) => section.rows)
    .flatMap((row) => row.fields);

  // Pantalla 5
  const motherInfo = filterFormsData.mother;
  const motherFields = motherInfo.sections
    .flatMap((section) => section.rows)
    .flatMap((row) => row.fields);

  // Pantalla 6: dos contactos lado a lado
  const emergencyInfo = filterFormsData.emergency;
  const emergencyFields = emergencyInfo.columns.flatMap((column) =>
    column.rows.flatMap((row) => row.fields),
  );

  const studentRequiredIds = studentFields
    .filter((f) => f.required)
    .map((f) => f.id);
  const infoRequiredIds = infoFields.filter((f) => f.required).map((f) => f.id);
  const generalRequiredIds = generalFields
    .filter((f) => f.required)
    .map((f) => f.id);
  const fatherRequiredIds = fatherFields
    .filter((f) => f.required)
    .map((f) => f.id);
  const motherRequiredIds = motherFields
    .filter((f) => f.required)
    .map((f) => f.id);
  const emergencyRequiredIds = emergencyFields
    .filter((f) => f.required)
    .map((f) => f.id);

  // Un solo formulario para todas las pantallas
  // "documents" arranca como lista vacía (ids de los documentos entregados)
  const defaultValues = [
    ...studentFields,
    ...infoFields,
    ...generalFields,
    ...fatherFields,
    ...motherFields,
    ...emergencyFields,
  ].reduce(
    (acc, field) => {
      acc[field.id] = "";
      return acc;
    },
    { documents: [] },
  );

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // Observar fecha de nacimiento para calcular edad
  const birthDateValue = useWatch({ control, name: "birthDate" });

  const gradeValue = useWatch({ control, name: "grade" });
  const groupOptions = groupsByGrade[gradeValue] ?? [];

  // Auto-completar fecha de matrícula (hoy) y código al montar
  useEffect(() => {
    const today = formatDate(new Date());
    const code = generateEnrollmentCode();

    setValue("enrollmentDate", today, { shouldValidate: true });
    setValue("studentCode", code, { shouldValidate: true });
  }, [setValue]);

  // Calcular edad cuando cambie la fecha de nacimiento.
  // Solo se valida si hay edad: así no aparece el error "obligatorio" al entrar.
  useEffect(() => {
    const age = calculateAge(birthDateValue);
    setValue("age", age, { shouldValidate: age !== "" });
  }, [birthDateValue, setValue]);

  const studentValues = useWatch({ control, name: studentRequiredIds });
  const infoValues = useWatch({ control, name: infoRequiredIds });
  const generalValues = useWatch({ control, name: generalRequiredIds });
  const fatherValues = useWatch({ control, name: fatherRequiredIds });
  const motherValues = useWatch({ control, name: motherRequiredIds });
  const emergencyValues = useWatch({ control, name: emergencyRequiredIds });

  const studentOk = allFilled(studentValues);
  const infoOk = allFilled(infoValues);
  const generalOk = allFilled(generalValues);
  const fatherOk = allFilled(fatherValues);
  const motherOk = allFilled(motherValues);
  const emergencyOk = allFilled(emergencyValues);

  const screenOkByStep = {
    1: studentOk,
    2: infoOk,
    3: generalOk,
    4: fatherOk,
    5: motherOk,
    6: emergencyOk,
  };
  const screenOk = screenOkByStep[screen] ?? false;

  // El stepper sigue a la pantalla visible
  const currentStep = screen;

  const goPrev = () => {
    if (screen > 1) setScreen(screen - 1);
  };

  const goNext = () => {
    if (!screenOk) return;
    if (screen < totalSteps) {
      setScreen(screen + 1);
    }
  };

  // El grupo recibe sus opciones según el grado elegido
  const renderField = (field) => (
    <FormFieldCascada
      key={field.id}
      field={field.id === "group" ? { ...field, options: groupOptions } : field}
      register={register}
      errors={errors}
      control={control}
      setValue={setValue}
    />
  );

  return (
    <div className="enrollment-page">
      <NavbarSection
        sectionKey="enrollment"
        context="admin"
        handleBack={handleBack}
      />
      <Stepper
        className="enrollment-stepper"
        steps={stepperData.enrollmentPageAdmin}
        currentStep={currentStep}
      />
      <div className="enrollment-container">
        <form noValidate>
          <div className="enrollment-screens">
            
            {/*  Pantalla 1: Datos del estudiante  */}
            <div
              className={`enrollment-screen${
                screen !== 1 ? " enrollment-screen--hidden" : ""
              }`}
            >
              {sectionTitle && (
                <h3 className="form-section-title">{sectionTitle}</h3>
              )}
              <div className="enrollment-student">
                <PhotoUpload name="photo" register={register} />
                <div className="enrollment-student__fields">
                  {rows.map((row) => (
                    <div className={row.className} key={row.id}>
                      {row.fields.map(renderField)}
                    </div>
                  ))}

                  {/* Documentos entregados: debajo de los select */}
                  {documentsSection && (
                    <section className="enrollment-documents">
                      <h4 className="enrollment-section__title">
                        {documentsSection.title}
                      </h4>
                      <div className="enrollment-documents__list">
                        {documentsSection.options.map((doc) => (
                          <label
                            className="enrollment-documents__item"
                            key={doc.id}
                          >
                            <input
                              type="checkbox"
                              value={doc.id}
                              {...register("documents")}
                            />
                            <span>{doc.label}</span>
                          </label>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>

            {/*  Pantalla 2: Información de la matrícula  */}
            <div
              className={`enrollment-screen${
                screen !== 2 ? " enrollment-screen--hidden" : ""
              }`}
            >
              <h3 className="form-section-title">
                {enrollmentInfo.sectionTitle}
              </h3>
              {enrollmentInfo.sections.map((section) => (
                <section className="enrollment-section" key={section.id}>
                  <h4 className="enrollment-section__title">{section.title}</h4>
                  {section.rows.map((row) => (
                    <div className={row.className} key={row.id}>
                      {row.fields.map(renderField)}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {/*  Pantalla 3: Información general  */}
            <div
              className={`enrollment-screen${
                screen !== 3 ? " enrollment-screen--hidden" : ""
              }`}
            >
              <h3 className="form-section-title">{generalInfo.sectionTitle}</h3>
              {generalInfo.sections.map((section) => (
                <section className="enrollment-section" key={section.id}>
                  {section.title && (
                    <h4 className="enrollment-section__title">
                      {section.title}
                    </h4>
                  )}
                  {section.rows.map((row) => (
                    <div className={row.className} key={row.id}>
                      {row.fields.map(renderField)}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {/*  Pantalla 4: Información del padre  */}
            <div
              className={`enrollment-screen${
                screen !== 4 ? " enrollment-screen--hidden" : ""
              }`}
            >
              <h3 className="form-section-title">{fatherInfo.sectionTitle}</h3>
              {fatherInfo.sections.map((section) => (
                <section className="enrollment-section" key={section.id}>
                  {section.title && (
                    <h4 className="enrollment-section__title">
                      {section.title}
                    </h4>
                  )}
                  {section.rows.map((row) => (
                    <div className={row.className} key={row.id}>
                      {row.fields.map(renderField)}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {/*  Pantalla 5: Información de la madre  */}
            <div
              className={`enrollment-screen${
                screen !== 5 ? " enrollment-screen--hidden" : ""
              }`}
            >
              <h3 className="form-section-title">{motherInfo.sectionTitle}</h3>
              {motherInfo.sections.map((section) => (
                <section className="enrollment-section" key={section.id}>
                  {section.title && (
                    <h4 className="enrollment-section__title">
                      {section.title}
                    </h4>
                  )}
                  {section.rows.map((row) => (
                    <div className={row.className} key={row.id}>
                      {row.fields.map(renderField)}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            {/*  Pantalla 6: Contacto de emergencia  */}
            <div
              className={`enrollment-screen${
                screen !== 6 ? " enrollment-screen--hidden" : ""
              }`}
            >
              <h3 className="form-section-title">{emergencyInfo.title}</h3>
              <div className="enrollment-family">
                {emergencyInfo.columns.map((column) => (
                  <section
                    className="enrollment-section enrollment-family__column"
                    key={column.id}
                  >
                    <h4 className="enrollment-section__title">
                      {column.title}
                    </h4>
                    {column.rows.map((row) => (
                      <div className={row.className} key={row.id}>
                        {row.fields.map(renderField)}
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="enrollment-buttons">
            {screen > 1 && (
              <Button
                type="button"
                variant="dark"
                shape="rounded"
                className="btn-uniform-width"
                size="md"
                onClick={goPrev}
              >
                Atrás
              </Button>
            )}

            <Button
              type="button"
              variant="primary"
              shape="rounded"
              className="btn-uniform-width"
              size="md"
              disabled={!screenOk}
              title={
                !screenOk
                  ? "Completa todos los campos obligatorios primero"
                  : undefined
              }
              onClick={goNext}
            >
              {currentStep === totalSteps ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentPage;
