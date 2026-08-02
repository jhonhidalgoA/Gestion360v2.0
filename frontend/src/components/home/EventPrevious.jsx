import { Link } from "react-router-dom";
import { eventData } from "@data/eventData";
import { TbArrowRight } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import EventCard from "@components/ui/Card/EventCard";
import "./EventPrevious.css";

const Event = ({
  cardsToShow = 2,
  showDetailsButton = false,
  showMoreButton = true,
}) => {
  const displayedEvents = eventData.slice(0, cardsToShow);

  return (
    <section className="event-section">
      <div className="event-section__list">
        {displayedEvents.map((event) => (
          <EventCard
            key={event.id}
            day={event.day}
            month={event.month}
            year={event.year}
            time={event.time}
            name={event.name}
            location={event.location}
            category={event.category}
            showDetailsButton={showDetailsButton}
          />
        ))}
      </div>

      {showMoreButton && (
        <div className="news-section__button">
          <Button
            as={Link}
            to="/school-events"
            variant="primary"
            shape="pill"
            size="md"
            className="btn-uniform-width"
            icon={TbArrowRight}
          >
            Ver detalles
          </Button>
        </div>
      )}
    </section>
  );
};

export default Event;
