import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbMail } from "react-icons/tb";
import Input from "@/components/ui/Input/Input";
import "./ResetEmail.css";

const COOLDOWN_SEGUNDOS = 60;

const ResetEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const emailRef = useRef(null);

  const validarEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => {
      setCooldown((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const enviarSolicitud = () => {
    setLoading(true);

    // Simulación temporal mientras no hay backend conectado.
    // Importante: la respuesta real del backend debe ser SIEMPRE
    // el mismo mensaje exista o no el correo, para evitar
    // enumeración de usuarios.
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      setCooldown(COOLDOWN_SEGUNDOS);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico");
      emailRef.current?.focus();
      return;
    }

    if (!validarEmail(email)) {
      setError("Ingresa un correo electrónico válido");
      emailRef.current?.focus();
      return;
    }

    setError("");
    enviarSolicitud();
  };

  const handleReenviar = () => {
    if (cooldown > 0 || loading) return;
    enviarSolicitud();
  };

  return (
    <div className="reset-password">
      <div className="container-reset">
        <form onSubmit={handleSubmit} className="form-reset" noValidate>
          <div className="title-reset">
            {!enviado && (
              <>
                <h1>¿No recuerdas tu contraseña?</h1>
                <h4>
                  ¡No te preocupes! <span>Nos sucede a todos.</span> Ingresa
                  tu Email y te ayudaremos
                </h4>
              </>
            )}
          </div>

          {enviado ? (
            <div className="reset-success" role="status" aria-live="polite">
              <div className="reset-success__icon-badge">
                <i className="material-symbols-outlined" aria-hidden="true">
                  mark_email_read
                </i>
              </div>

              <h3 className="reset-success__title">¡Revisa tu correo!</h3>

              <p>
                Si el correo ingresado existe en nuestro sistema, recibirás
                un enlace para restablecer tu contraseña en unos minutos.
              </p>

              <button
                type="button"
                className="reset-success__resend"
                onClick={handleReenviar}
                disabled={cooldown > 0 || loading}
              >
                {loading
                  ? "Enviando..."
                  : cooldown > 0
                  ? `¿No recibiste nada? Reenviar en ${cooldown}s`
                  : "¿No recibiste nada? Reenviar correo"}
              </button>
            </div>
          ) : (
            <>
              <Input
                ref={emailRef}
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                leftIcon={TbMail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                error={error}
                variant="rounded"
              />

              <div className="input-btn">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Enviando..." : "Restablecer contraseña"}
                </button>
              </div>
            </>
          )}

          <div className="back-to-login">
            <Link to="/login">← Volver a iniciar sesión</Link>
          </div>

          <div className="social-photo">
            <p className="author">
              Image by: Vinicius Imbroisi{" "}
              <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5541099">
                Pixabay
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetEmail;