import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaClipboardList,
  FaCheckCircle,
  FaCommentAlt,
  FaCalendarAlt,
  FaTicketAlt,
} from "react-icons/fa";
import "./NotificationsPanel.css";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: FaClipboardList,
    color: "#3b6bb3",
    bg: "#DCEAFB",
    title: "Nueva calificación registrada",
    description: "10° A · Matemáticas — se publicó la nota del corte 3",
    time: "Hace 12 min",
    read: false,
  },
  {
    id: 2,
    icon: FaCheckCircle,
    color: "#2f8f5a",
    bg: "#DFF5E7",
    title: "Asistencia pendiente",
    description: "11° A no tiene asistencia registrada de hoy",
    time: "Hace 40 min",
    read: false,
  },
  {
    id: 3,
    icon: FaCommentAlt,
    color: "#c1518a",
    bg: "#FBE0EA",
    title: "Mensaje de un acudiente",
    description: "María Torres preguntó sobre el taller de 9° C",
    time: "Hace 2 h",
    read: false,
  },
  {
    id: 4,
    icon: FaCalendarAlt,
    color: "#c17a3a",
    bg: "#FDEAD9",
    title: "Cambio de salón",
    description: "9° C se trasladó al Salón 112 desde mañana",
    time: "Ayer",
    read: true,
  },
  {
    id: 5,
    icon: FaTicketAlt,
    color: "#6d4fc4",
    bg: "#E8E0FB",
    title: "Ticket de soporte respondido",
    description: "Tu solicitud #1042 tiene una respuesta nueva",
    time: "Hace 2 días",
    read: true,
  },
];

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const panelRef = useRef(null);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visibleNotifications = notifications.filter(
    (n) => filter === "all" || !n.read
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !bellRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="notifications">
      <button
        ref={bellRef}
        className={`notifications-bell ${open ? "notifications-bell--open" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBell size={18} />
        {unreadCount > 0 && (
          <span className="notifications-badge">{unreadCount}</span>
        )}
      </button>

      <div
        ref={panelRef}
        className={`notifications-panel ${open ? "notifications-panel--open" : ""}`}
      >
        <div className="notifications-panel__head">
          <h2>Notificaciones</h2>
          <button className="notifications-mark-all" onClick={markAllAsRead}>
            Marcar todas como leídas
          </button>
        </div>

        <div className="notifications-tabs">
          <button
            className={`notifications-tab ${filter === "all" ? "notifications-tab--active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todas
          </button>
          <button
            className={`notifications-tab ${filter === "unread" ? "notifications-tab--active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            No leídas
          </button>
        </div>

        <div className="notifications-list">
          {visibleNotifications.length === 0 ? (
            <p className="notifications-empty">
              No tienes notificaciones sin leer
            </p>
          ) : (
            visibleNotifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`notifications-item ${!n.read ? "notifications-item--unread" : ""}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div
                    className="notifications-item__icon"
                    style={{ background: n.bg, color: n.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="notifications-item__body">
                    <p className="notifications-item__title">{n.title}</p>
                    <p className="notifications-item__desc">{n.description}</p>
                    <span className="notifications-item__time">{n.time}</span>
                  </div>
                  {!n.read && <span className="notifications-dot" />}
                </div>
              );
            })
          )}
        </div>

        <div className="notifications-panel__foot">
          <a href="#">Ver todas las notificaciones</a>
        </div>
      </div>
    </div>
  );
}
