import { Link } from "react-router-dom";
import { serviceData } from "@data/serviceData";
import ServiceCard from "@components/ui/Card/ServiceCard";
import "./Service.css";

const Service = () => {
  return (
    <div>
      <div className="service-container">
        {serviceData.map((item) => (
          <Link to={item.path} key={item.id} style={{ textDecoration: "none" }}>
            <ServiceCard
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              linkText={item.linkText}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Service;
