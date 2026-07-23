import { useEffect, useState } from "react";
import Select from "react-select";
import Navbar from "@/components/navbar/Navbar";
import EventCard from "@/components/ui/Card/EventCard";
import { eventData } from "@/data/eventData";
import { categoryLabels } from "@/data/eventCategories";
import Banner from "@/components/ui/Banner/Banner";
import { bannerData } from "@/data/bannerData";
import "./SchoolEvents.css";

const uniqueMonths = [...new Set(eventData.map((e) => e.month))];

const monthOptions = uniqueMonths.map((month) => ({
  value: month,
  label: month,
}));

const uniqueCategories = [...new Set(eventData.map((e) => e.category))];

const categoryOptions = uniqueCategories.map((category) => ({
  value: category,
  label: categoryLabels[category] || category,
}));

const SchoolEvents = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredEvents = eventData.filter((event) => {
    const matchesMonth =
      !selectedMonth || event.month === selectedMonth.value;

    const matchesCategory =
      !selectedCategory || event.category === selectedCategory.value;

    return matchesMonth && matchesCategory;
  });

  return (
    <div className="events-school">
      <Navbar />
      <Banner {...bannerData.eventos} />
      <div className="filters-wrapper">
        <div className="filters-container">
          <div className="filters-header">
            <h2 className="filters-title">Filtrar eventos</h2>
            <span className="filters-count">
              {filteredEvents.length} {filteredEvents.length === 1 ? "evento" : "eventos"}
            </span>
          </div>

          <div className="select-container">
            <div className="group-select">
              <label htmlFor="month">Mes</label>
              <Select
                inputId="month"
                className="select-input"
                classNamePrefix="react-select"
                options={monthOptions}
                value={selectedMonth}
                onChange={setSelectedMonth}
                placeholder="Todos los meses"
                isClearable
              />
            </div>

            <div className="group-select">
              <label htmlFor="category">Categoría</label>
              <Select
                inputId="category"
                className="select-input"
                classNamePrefix="react-select"
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Todas las categorías"
                isClearable
              />
            </div>
          </div>
        </div>
      </div>

      <div className="event-container">
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <h3 className="title-event">
              No hay eventos que coincidan con los filtros seleccionados.
            </h3>
            <p>Intenta ajustar los criterios de búsqueda.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              day={event.day}
              month={event.month}
              year={event.year}
              time={event.time}
              name={event.name}
              location={event.location}
              category={event.category}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SchoolEvents;