import { Link } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import "./Hero.css";

const Hero = () => {
  
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Matrículas Abiertas 2026 </h1>
        <p>
          Forma parte de nuestra comunidad educativa con enfoque en innovación y
          excelencia académica, un proyecto que transforma vidas y abre
          oportunidades para el futuro.
        </p>
      </div>
      <div className="button-hero">
        <Button
          as={Link}
          to="/enrollment"
          variant="primary"
          shape="pill"
          size="md"
          className="btn-uniform-width"
          icon={TbArrowRight}
        >
          Más información
        </Button>
      </div>
    </div>
  );
};

export default Hero;
