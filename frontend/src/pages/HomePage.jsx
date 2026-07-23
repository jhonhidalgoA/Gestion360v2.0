import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Title from "@components/ui/Title/Title";
import Hero from "@/components/home/Hero";
import NewPrevious from "@/components/home/NewPrevious";
import EventPrevious from "@/components/home/EventPrevious";
import About from "@/components/home/About";
import Service from "@/components/home/Service";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";

import { scroller } from "react-scroll";

const HomePage = ({ playState, setPlayState }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = location.state.scrollTo;

      if (target === "inicio") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => {
          scroller.scrollTo(target, {
            smooth: true,
            duration: 600,
            offset: -80,
          });
        }, 100);
      }

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <>
      <Navbar />
      <div id="inicio">
        <Hero />
      </div>
      <div className="container">
        <div id="noticias">
          <Title subTitle="Noticias" title="Lo más Reciente" />
          <NewPrevious cardsToShow={3} showMoreButton={true} />
        </div>
      </div>
      <div className="container">
        <div id="school-events">
          <Title subTitle="Eventos" title="Agenda Escolar" />
          <EventPrevious
            cardsToShow={2}
            showDetailsButton={true}
            showMoreButton={true}
          />
        </div>
      </div>
      <div className="container">
        <div id="nosotros">
          <Title subTitle="Nosotros" title="Nuestro proposito" />
          <About setPlayState={setPlayState} />
        </div>
      </div>
      <div className="container">
        <div id="institucional">
          <Title subTitle="Institucional" title="Servicios y Comunidad" />
          <Service />
        </div>
      </div>
      <div className="container">
        <div id="contacto">
          <Title subTitle="Contacto" title="Estamos aquí para ayudarte" />
          <Contact />
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </>
  );
};

export default HomePage;
