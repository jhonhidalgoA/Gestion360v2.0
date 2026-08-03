import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbUser, TbLock } from "react-icons/tb";
import Input from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { loginSchema, loginDefaultValues } from "@schemas/loginSchema";
import usersData from "@/data/usersData";
import "./Login.css";

const MAX_INTENTOS = 5;
const BLOQUEO_SEGUNDOS = 30;

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(0);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: loginDefaultValues,
  });

  useEffect(() => {
    if (!bloqueado || segundosRestantes <= 0) return;

    const timer = setTimeout(() => {
      setSegundosRestantes((s) => {
        const next = s - 1;

        if (next <= 0) {
          setBloqueado(false);
          setIntentosFallidos(0);
          clearErrors("root");
        }

        return next;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [bloqueado, segundosRestantes, clearErrors]);

  const onSubmit = (data) => {
    if (bloqueado) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const usuario = usersData.find(
        (user) =>
          user.username === data.username && user.password === data.password,
      );

      if (usuario) {
        switch (usuario.role) {
          case "administrador":
            navigate("/admin");
            break;

          case "docente":
            navigate("/teacher");
            break;

          case "padre":
            navigate("/padre");
            break;

          case "estudiante":
            navigate("/estudiante");
            break;

          default:
            navigate("/");
        }

        return;
      }

      const nuevosIntentos = intentosFallidos + 1;
      setIntentosFallidos(nuevosIntentos);

      if (nuevosIntentos >= MAX_INTENTOS) {
        setBloqueado(true);
        setSegundosRestantes(BLOQUEO_SEGUNDOS);

        setError("root", {
          message: `Demasiados intentos. Intenta de nuevo en ${BLOQUEO_SEGUNDOS}s`,
        });
      } else {
        setError("root", {
          message: "Documento o Contraseña incorrectos",
        });
      }

      setFocus("username");
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="container-login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-login"
          noValidate
        >
          <div className="title-login">
            <h2>Bienvenido(a) a Gestion 360</h2>
          </div>

          <div className="error-login">
            {errors.root && (
              <div
                className="error-message-login"
                role="alert"
                aria-live="polite"
              >
                {errors.root.message}
              </div>
            )}
          </div>

          <Input
            label="Documento"
            name="username"
            type="text"
            autoComplete="username"
            leftIcon={TbUser}
            error={errors.username}
            disabled={bloqueado}
            variant="square"
            register={register}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="off"
            leftIcon={TbLock}
            error={errors.password}
            disabled={bloqueado}
            variant="square"
            register={register}
          />

          <div className="input-check">
            <div className="check">
              <input
                type="checkbox"
                id="checkbox"
                disabled={bloqueado}
                {...register("remember")}
              />
              <label htmlFor="checkbox">Recordar</label>
            </div>

            <div className="forgot-password">
              <Link to="/reset" className="forgot-password">
                ¿Olvidó la contraseña?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            shape="pill"
            size="md"
            width="full"
            disabled={loading || bloqueado || isSubmitting}
          >
            {bloqueado
              ? `Espera ${segundosRestantes}s`
              : loading || isSubmitting
                ? "Ingresando..."
                : "Ingresar"}
          </Button>

          <div className="social-photo">
            <p className="author">
              Image by{" "}
              <a href="https://pixabay.com/users/vimbroisi-16343850/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5541099">
                Vinicius Imbroisi
              </a>{" "}
              from{" "}
              <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5541099">
                Pixabay
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
