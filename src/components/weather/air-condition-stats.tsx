import React, { ReactNode } from "react";
//
import {
  unitAbbreviationForSpeed,
  unitAbbreviationForTemperature,
} from "../../utils/helper";

import { Cloud, Humidity, Temperature, Wind } from "../icons";

export const AirConditionStats: React.FC<WeatherStatsProp> = ({
  data,
  unit,
}) => {
  const dataList = () => {
    return [
      {
        header: `${data?.clouds?.all} %`,
        icon: <Cloud />,
        title: "Clouds",
      },
      {
        header: `${data?.wind?.speed} ${unitAbbreviationForSpeed(unit)}`,
        icon: <Wind />,
        title: "Wind",
      },
      {
        header: `${Math.round(
          data?.main?.feels_like
        )} ${unitAbbreviationForTemperature(unit)}`,
        icon: <Temperature />,
        title: "Feels Like",
      },
      {
        header: `${data?.main?.humidity} %`,
        icon: <Humidity />,
        title: "Humidity",
      },
    ];
  };

  return (
    <div>
      <h2>AIR CONDITIONS</h2>
      {dataList().map(({ title, icon, header }) => {
        return (
          <div key={title} className="currentWeatherStatsBox">
            <IconTag icon={icon} title={title} />
            <p>{header}</p>
          </div>
        );
      })}
    </div>
  );
};

type IconTagProps = {
  icon: ReactNode;
  title: string;
};
export const IconTag: React.FC<IconTagProps> = ({ icon, title }) => {
  return (
    <div className="iconTagBox">
      {icon}
      <span className="iconTag">{title}</span>
    </div>
  );
};
