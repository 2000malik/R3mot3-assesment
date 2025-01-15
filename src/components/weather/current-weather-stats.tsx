import React, { ReactNode } from "react";
//
import { unitAbbreviationForTemperature } from "../../utils/helper";
import { imgBaseURL } from "../../utils/constants";

export const CurrentWeatherStats: React.FC<WeatherStatsProp> = ({
  data,
  unit,
}) => {
  let labelTag = "CURRENT WEATHER";
  if (unit) {
    if (unit === "metric") {
      labelTag += " IN CELSIUS";
    } else {
      labelTag += " IN FAHRENHEIT";
    }
  }
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const dataList = () => {
    return [
      {
        header: `${data?.name?.toUpperCase()}, ${data?.sys?.country?.toUpperCase()}`,
        subText: ` ${today?.toDateString()}`,
      },
      {
        header: `${Math.round(
          Number(data?.main?.temp)
        )} ${unitAbbreviationForTemperature(unit)}`,
        subText: ` ${data?.weather?.[0]?.description}`,
      },
      {
        header: (
          <img
            alt={data?.weather?.[0]?.main || "img"}
            src={`${imgBaseURL}/${data?.weather?.[0]?.icon}@2x.png`}
            width={"100"}
            height={"auto"}
          />
        ),
        subText: ``,
      },
    ];
  };
  return (
    <div>
      <h2>{labelTag}</h2>
      <div>
        {dataList().map(({ header, subText }) => (
          <div key={subText}>
            <CurrentWeatherStatsTag heading={header} subtitle={subText} />
          </div>
        ))}
      </div>
    </div>
  );
};

type CurrentWeatherStatsTagProps = {
  heading: ReactNode;
  subtitle: string;
};
export const CurrentWeatherStatsTag: React.FC<CurrentWeatherStatsTagProps> = ({
  heading,
  subtitle,
}) => {
  return (
    <div className="currentWeatherStatsBox">
      <h3>{heading}</h3>
      <h4>{subtitle}</h4>
    </div>
  );
};
