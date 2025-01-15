import { useCallback, useState } from "react";
//
import { apiKey, apiUrl } from "../utils/constants";
import { isObjEmpty } from "../utils/helper";

type ErrorData = {
  cod: string;
  message: string;
};

export const useGetWeatherStats = () => {
  // states
  const [searchValue, setSearchValue] = useState<string>("");
  const [unit, setUnit] = useState<string>("metric");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({});

  // functions
  const handleUnitConversionChange = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = evt.target.value;
    if (unit !== value) {
      setData({});
    }
    setUnit(value);
  };

  const getCurrentWeatherStats = useCallback(async () => {
    const url = `${apiUrl}/data/2.5/weather?q=${searchValue}&units=${unit}&appid=${apiKey}`;
    try {
      setIsLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        setData({});
        const errorData: ErrorData = await res.json();
        if (errorData.cod === "404") {
          setError(errorData.message);
        } else {
          setError("An error occurred while fetching data.");
        }
      }
      if (res.ok) {
        const wthResponse = await res.json();

        setData(wthResponse);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const typedError = error as Error;
      setIsLoading(false);
      setError(typedError.message);
    }
  }, [searchValue, unit]);

  const getWeatherStats = async () => {
    await getCurrentWeatherStats();
  };

  const isDataEmpty = isObjEmpty(data);

  return {
    getWeatherStats,
    searchValue,
    setSearchValue,
    unit,
    handleUnitConversionChange,
    isLoading,
    data,
    error,
    isDataEmpty,
  };
};
