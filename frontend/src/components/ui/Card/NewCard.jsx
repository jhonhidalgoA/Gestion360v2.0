import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import PhotoCarousel from "@/components/ui/PhotoCarousel/PhotoCarousel";
import "./NewCard.css";

const NewsCard = ({
  image,
  school = "Colegio",
  title,
  date,
  buttonText = "Leer noticia",
  link = "#",
  photos = [],
}) => {
  const [showCarousel, setShowCarousel] = useState(false);

  const handleOpenCarousel = (e) => {
    e.preventDefault();
    setShowCarousel(true);
  };

  return (
    <>
      <article className="news-card">
        <div className="news-card__image-wrapper">
          <img src={image} alt={title} className="news-card__image" />
        </div>
        <div className="news-card__content">
          <div className="news-card__header">
            <span className="news-card__school">{school}</span>
            <span className="news-card__brand">STEAM 360</span>
          </div>
          <h3 className="news-card__title">{title}</h3>
          <div className="news-card__footer">
            <div className="news-card__date">
              <FiCalendar />
              <span>{date}</span>
            </div>
            {photos.length > 0 ? (
              <button
                onClick={handleOpenCarousel}
                className="news-card__button"
              >
                {buttonText}
              </button>
            ) : (
              <Link to={link} className="news-card__button">
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </article>

      {showCarousel && (
        <PhotoCarousel photos={photos} onClose={() => setShowCarousel(false)} />
      )}
    </>
  );
};

export default NewsCard;
