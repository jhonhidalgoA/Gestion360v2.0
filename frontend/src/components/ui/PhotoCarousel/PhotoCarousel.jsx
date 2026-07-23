import { useState, useEffect } from "react";
import { TbX, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./PhotoCarousel.css";

const PhotoCarousel = ({ photos = [], onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!photos.length) return null;

  const total = photos.length;
  const currentPhoto = photos[currentIndex];
  return (
    <div
      className="photo-carousel"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotografías"
    >
      <div
        className="photo-carousel__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="photo-carousel__close"
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          <TbX size={28} />
        </button>

        <button
          className="photo-carousel__arrow photo-carousel__arrow--left photo-carousel__nav-prev"
          aria-label="Anterior"
          type="button"
        >
          <TbChevronLeft size={64} />
        </button>

        <Swiper
          modules={[Navigation, Thumbs, Keyboard, A11y]}
          navigation={{
            prevEl: ".photo-carousel__nav-prev",
            nextEl: ".photo-carousel__nav-next",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          keyboard={{ enabled: true }}
          initialSlide={initialIndex}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          className="photo-carousel__swiper"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <div className="photo-carousel__image-wrapper">
                <img
                  src={photo.url}
                  alt={photo.title || `Foto ${index + 1}`}
                  className="photo-carousel__image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="photo-carousel__arrow photo-carousel__arrow--right photo-carousel__nav-next"
          aria-label="Siguiente"
          type="button"
        >
          <TbChevronRight size={34} />
        </button>

        <div className="photo-container">
          <div className="photo-carousel__info">
            <div className="photo-carousel__counter">
              {currentIndex + 1} de {total}
            </div>
            {currentPhoto.title && (
              <h2 className="photo-carousel__title">{currentPhoto.title}</h2>
            )}
            {currentPhoto.subtitle && (
              <h3 className="photo-carousel__subtitle">
                {currentPhoto.subtitle}
              </h3>
            )}
          </div>

          {total > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={14}
              slidesPerView="auto"
              watchSlidesProgress
              className="photo-carousel__thumbnails"
            >
              {photos.map((photo, index) => (
                <SwiperSlide
                  key={index}
                  className={`photo-carousel__thumbnail ${
                    index === currentIndex
                      ? "photo-carousel__thumbnail--active"
                      : ""
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || `Foto ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        {currentPhoto.comment && (
          <p className="photo-carousel__comment">{currentPhoto.comment}</p>
        )}
      </div>
    </div>
  );
};

export default PhotoCarousel;
