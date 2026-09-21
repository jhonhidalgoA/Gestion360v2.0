import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/components/hooks/useAuth";
import { profileFields, passwordFields } from "@/data/profileData";
import { FaSave } from "react-icons/fa";

import FormFieldCascada from "@/components/ui/FormFieldCascada/FormFieldCascada";
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

  const [passwordErrors, setPasswordErrors] = useState({});

  const defaultValues = {
    documento: user?.documento || "",
    nombre: user?.fullName || "",
    correo: user?.correo || "",
    telefono: user?.telefono || "",
    actual: "",
    nueva: "",
    confirmar: "",
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  if (!isOpen) return null;

  const validatePassword = (data) => {
    const errors = {};
    if (!data.actual) {
      errors.actual = "Ingresa tu contraseña actual";
    }
    if (data.nueva.length < 8) {
      errors.nueva = "Debe tener al menos 8 caracteres";
    }
    if (data.confirmar !== data.nueva) {
      errors.confirmar = "Las contraseñas no coinciden";
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSavePersonal = async (data) => {
    if (!data.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.correo)) {
      alert("Ingresa un correo válido");
      return;
    }

    setIsSavingPersonal(true);
    try {
      await updateProfile({
        nombreCompleto: data.nombre,
        correo: data.correo,
        telefono: data.telefono,
      });
      onClose();
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      alert("No se pudo guardar. Intenta de nuevo.");
    } finally {
      setIsSavingPersonal(false);
    }
  };

  const handleUpdatePassword = async (data) => {
    if (!validatePassword(data)) return;
    setIsSavingPassword(true);
    try {
      await updatePassword({
        actual: data.actual,
        nueva: data.nueva,
      });
      reset({ ...defaultValues, actual: "", nueva: "", confirmar: "" });
      onClose();
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      setPasswordErrors({
        general: "No se pudo actualizar la contraseña. Verifica los datos.",
      });
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
          <form onSubmit={handleSubmit(onSavePersonal)}>
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
                {profileFields.map((field) => (
                  <FormFieldCascada
                    key={field.id}
                    field={field}
                    register={register}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                  />
                ))}
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
            </div>
          </form>
        )}

        {activeTab === TABS.SEGURIDAD && (
          <form onSubmit={handleSubmit(handleUpdatePassword)}>
            <div className="edit-perfil-body">
              <div className="form-row-profile">
                {passwordFields.map((field) => (
                  <FormFieldCascada
                    key={field.id}
                    field={field}
                    register={register}
                    errors={passwordErrors}
                    control={control}
                    setValue={setValue}
                  />
                ))}
              </div>

              <div className="edit-perfil-info-banner">
                Usa al menos 8 caracteres, una mayúscula y un número.
              </div>

              {passwordErrors.general && (
                <p className="edit-perfil-error edit-perfil-error--general">
                  {passwordErrors.general}
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