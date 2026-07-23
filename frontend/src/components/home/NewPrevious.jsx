import { Link } from "react-router-dom";
import { newsData } from "@data/newsData";
import { TbArrowRight } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import NewCard from "@components/ui/Card/NewCard";
import "./NewPrevious.css";

const NewPrevious = ({ cardsToShow = 3, showMoreButton = true }) => {
  const displayedCards = newsData.slice(0, cardsToShow); 
  console.log("cardsToShow:", cardsToShow);
  console.log("newsData:", newsData.length);
  console.log("displayedCards:", displayedCards.length);

  return (
    <section className="news-section">
      <div className="news-section__grid">
        {displayedCards.map((noticia) => (
          <NewCard
            key={noticia.id}
            image={noticia.image}
            school={noticia.school}
            title={noticia.title}
            date={noticia.date}
            link={noticia.link}
            photos={noticia.photos}
          />
        ))}
      </div>

      {showMoreButton && (
        <div className="news-section__button">
           <Button
          as={Link}
          to="/news"
          variant="primary"
          shape="pill"
          size="lg"
          icon={TbArrowRight}
        >
          Ver más
        </Button>
        </div>
      )}
    </section>
  );
};

export default NewPrevious;
