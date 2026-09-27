import "./SupportCard.css";

export default function SupportCard({ channel, onSelect }) {
  return (
    <button className="support-button" onClick={() => onSelect(channel.id)}>
      <div className="supportCard-icon" style={{ color: channel.color }}>
        {channel.icon}
      </div>
      <p className="supportCard-name">{channel.name}</p>
      <p className="supportCard-desc">{channel.description}</p>
      <span
        className={`supportCard-meta ${channel.id === "chat" ? "supportCard-meta--status" : ""}`}
        style={{ color: channel.color }}
      >
        {channel.meta}
      </span>
    </button>
  );
}