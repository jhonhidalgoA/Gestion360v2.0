import { Clock, MapPin } from "lucide-react";
import { getCategoryColor, getCategoryLabel } from "@/data/eventCategories";
import "./EventCard.css";

const EventCard = ({ day, month, year, time, name, location, category }) => {
  const accent = getCategoryColor(category);

  return (
    <div className="event-card">
      <div className="event-date">
        <p className="event-day">{day}</p>
        <span className="event-month">{month}</span>
        <p className="event-year">{year}</p>
      </div>

      <div className="event-details">
        <div className="event-details-header">
          <span className="event-time">
            <Clock size={25} strokeWidth={2} />
            {time}
          </span>

          {category && (
            <span className="event-badge" style={{ backgroundColor: accent }}>
              {getCategoryLabel(category)}
            </span>
          )}
        </div>

        <h3 className="event-name">{name}</h3>

        <p className="event-location">
          <MapPin size={25} strokeWidth={2} />
          {location}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
