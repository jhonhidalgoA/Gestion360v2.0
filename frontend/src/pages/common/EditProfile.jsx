import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/hooks/useAuth";
import {
  profileFields,
  passwordFields,
  profileDefaultValues,
  passwordDefaultValues,
  profileSchema,
  passwordSchema,
} from "@/schemas/profileSchema";
import { FaSave } from "react-icons/fa";

import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import "./EditProfile.css";

const TABS = {
  PERSONAL: "personal",
  SEGURIDAD: "seguridad",
};

const EditPerfil = ({ isOpen, onClose }) => {
  const { user, updateProfile, updatePassword } = useAuth();

  const [activeTab, setActiveTab] = useState(TABS.PERSONAL);
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...profileDefaultValues,
      nombre: user?.fullName || "",
      correo: user?.correo || "",
      telefono: user?.telefono || "",
      area: user?.area || "",
    },
    mode: "onChange",
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: passwordDefaultValues,
    mode: "onChange",
  });

  if (!isOpen) return null;

  const onSavePersonal = async (data) => {
    setIsSavingPersonal(true);
    setGeneralError("");
    try {
      await updateProfile({
        nombreCompleto: data.nombre,
        correo: data.correo,
        telefono: data.telefono,
        area: data.area,
      });
      onClose();
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      setGeneralError("No se pudo guardar. Intenta de nuevo.");
    } finally {
      setIsSavingPersonal(false);
    }
  };

  const onUpdatePassword = async (data) => {
    setIsSavingPassword(true);
    setGeneralError("");
    try {
      await updatePassword({ actual: data.actual, nueva: data.nueva });
      resetPassword(passwordDefaultValues);
      onClose();
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      setGeneralError(
        "No se pudo actualizar la contraseña. Verifica los datos.",
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  const getInitials = (fullName = "") =>
    fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <>
      <div className="edit-perfil-overlay" onClick={onClose} />
      <div className="edit-perfil-panel">
        <div className="edit-perfil-header">
          <div className="edit-perfil-header-title">
            <p>Editar perfil</p>
          </div>
          <button
            className="edit-perfil-close-btn"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="edit-perfil-tabs">
          <button
            className={`edit-perfil-tab ${
              activeTab === TABS.PERSONAL ? "edit-perfil-tab--active" : ""
            }`}
            onClick={() => setActiveTab(TABS.PERSONAL)}
          >
            Información personal
          </button>
          <button
            className={`edit-perfil-tab ${
              activeTab === TABS.SEGURIDAD ? "edit-perfil-tab--active" : ""
            }`}
            onClick={() => setActiveTab(TABS.SEGURIDAD)}
          >
            <span className="material-symbols-outlined">lock</span>
            Seguridad
          </button>
        </div>

        {activeTab === TABS.PERSONAL && (
          <form onSubmit={handleSubmitProfile(onSavePersonal)}>
            <div className="edit-perfil-body">
              <div className="edit-perfil-avatar-row">
                <div className="edit-perfil-avatar">
                  {getInitials(user?.fullName || "")}
                </div>
                <div>
                  <p className="edit-perfil-avatar-label">Cambiar foto</p>
                  <p className="edit-perfil-avatar-hint">JPG o PNG, máx 2MB</p>
                </div>
              </div>

              <div className="form-row-profile">
                {profileFields.map((field) =>
                  field.type === "select" ? (
                    <Select
                      key={field.id}
                      label={field.label}
                      name={field.id}
                      id={field.id}
                      options={field.options || []}
                      placeholder="Seleccione una opción"
                      register={registerProfile}
                      error={profileErrors[field.id]}
                      required={field.required}
                      disabled={field.disabled}
                      variant="square"
                    />
                  ) : (
                    <Input
                      key={field.id}
                      label={field.label}
                      name={field.id}
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      register={registerProfile}
                      error={profileErrors[field.id]}
                      required={field.required}
                      disabled={field.disabled}
                      variant="square"
                      autoComplete="off"
                    />
                  ),
                )}
              </div>

              {generalError && (
                <p className="edit-perfil-error edit-perfil-error--general">
                  {generalError}
                </p>
              )}
            </div>

            <div className="edit-perfil-footer">
              <Button
                type="button"
                variant="light"
                className="btn-uniform-width"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={FaSave}
                iconPosition="left"
                disabled={isSavingPersonal}
              >
                {isSavingPersonal ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        )}

        {activeTab === TABS.SEGURIDAD && (
          <form onSubmit={handleSubmitPassword(onUpdatePassword)}>
            <div className="edit-perfil-body">
              <div className="form-row-profile">
                {passwordFields.map((field) => (
                  <Input
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={registerPassword}
                    error={passwordErrors[field.id]}
                    required={field.required}
                    variant="square"
                    autoComplete="off"
                  />
                ))}
              </div>

              <div className="edit-perfil-info-banner">
                Usa al menos 8 caracteres, una mayúscula y un número.
              </div>

              {generalError && (
                <p className="edit-perfil-error edit-perfil-error--general">
                  {generalError}
                </p>
              )}
            </div>

            <div className="edit-perfil-footer">
              <Button
                type="button"
                variant="light"
                className="btn-uniform-width"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={FaSave}
                iconPosition="left"
                disabled={isSavingPassword}
              >
                {isSavingPassword ? "Actualizando..." : "Actualizar contraseña"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditPerfil;