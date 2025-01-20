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
  const [data, setData] = useState<WeatherData | null>(null);

  // Handle unit conversion change
  const handleUnitConversionChange = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = evt.target.value;
    if (unit !== value) {
      setData(null); // Clear data on unit change
    }
    setUnit(value);
  };

  // Fetch weather stats
  const getCurrentWeatherStats = useCallback(async () => {
    if (!searchValue) return; // Early return if no search value

    const url = `${apiUrl}/data/2.5/weather?q=${searchValue}&units=${unit}&appid=${apiKey}`;

    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(url);
      const responseData: WeatherData | ErrorData = await res.json();

      if (!res.ok) {
        setData(null);
        const errorData = responseData as ErrorData;

        if (errorData.cod === "404") {
          setError(errorData.message);
        } else {
          setError("An error occurred while fetching data.");
        }
      } else {
        setData(responseData as WeatherData);
        setError(""); // Clear previous errors
      }
    } catch (error) {
      // setIsLoading(false);
      const typedError = error as Error;
      setError(typedError.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Ensure loading is always stopped
    }
  }, [searchValue, unit]);

  // Main function to trigger weather fetch
  const getWeatherStats = async () => {
    await getCurrentWeatherStats();
  };

  // Check if data is empty
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
