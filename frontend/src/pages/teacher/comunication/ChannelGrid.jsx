import { useState } from "react";
import { TbCheck } from "react-icons/tb";

import { channelData } from "@/data/channelData";

const ChannelGrid = ({
  channels = channelData,
  selected = [],
  onChange,
  disabled = false,
}) => {
  const [internalSelected, setInternalSelected] = useState([]);

  const currentSelected = onChange ? selected : internalSelected;

  const handleToggle = (channelId) => {
    if (disabled) return;

    const next = currentSelected.includes(channelId)
      ? currentSelected.filter((id) => id !== channelId)
      : [...currentSelected, channelId];

    if (onChange) {
      onChange(next);
    } else {
      setInternalSelected(next);
    }
  };

  return (
    <div className="channels-grid">
      {channels.map((channel) => {
        const isSelected = currentSelected.includes(channel.id);

        return (
          <button
            key={channel.id}
            type="button"
            data-color={channel.id}
            onClick={() => handleToggle(channel.id)}
            className={`channel-button ${isSelected ? "selected" : ""}`}
            disabled={disabled}
          >
            <span className="channel-check">
              <TbCheck strokeWidth={3.5} />
            </span>
            <span className="channel-icon">{channel.icon}</span>
            <div className="channel-name">{channel.name}</div>
            <div className="channel-desc">{channel.description}</div>
          </button>
        );
      })}
    </div>
  );
};

export default ChannelGrid;
