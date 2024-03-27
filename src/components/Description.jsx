import React from "react";
import "./style.css";
import { FaArrowDown, FaArrowUp, FaLowVision, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdDangerous, MdOutlineWaterDrop } from "react-icons/md";
const Description = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaLowVision />,
      title: "visibility",
      data: weather.visibility,
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <MdDangerous />,
      title: "UV rate",
      data: weather.uvIndex,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.temperatureApparent,
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressureSurfaceLevel,
      unit: "hpa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.windSpeed,
      unit: windUnit,
    },
  ];

  return (
    <div className="section section_descriptions">
      {cards.map(({ id, icon, title, data, unit="" }) => (
        <div key={id} className="card">
          <div className="description_card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};
export default Description;
