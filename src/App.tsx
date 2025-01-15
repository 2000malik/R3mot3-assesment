import { useEffect, lazy, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
//
import { units } from "./utils/constants";
import { useGetWeatherStats } from "./hooks/useGetWeatherStats";
import { CloudSunRain } from "./components/icons";
//
import { Button, SearchBox, SelectBox } from "./components";
const CurrentWeatherStats = lazy(() =>
  import("./components").then((module) => ({
    default: module.CurrentWeatherStats,
  }))
);
const AirConditionStats = lazy(() =>
  import("./components").then((module) => ({
    default: module.AirConditionStats,
  }))
);
import "./App.css";

function App() {
  const {
    getWeatherStats,
    searchValue,
    setSearchValue,
    unit,
    handleUnitConversionChange,
    isLoading,
    error,
    data,
    isDataEmpty,
  } = useGetWeatherStats();

  // Display error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: `error-toast-${Date.now()}`,
      });
    }
  }, [error]);

  return (
    <>
      <ToastContainer theme="dark" />
      <h1 className="header">weather forecast</h1>
      <div className="container">
        <div className="form-section">
          <SearchBox
            value={searchValue}
            onChange={(evt) => setSearchValue(evt.target.value)}
            placeholder="Enter city name here"
          />
          <SelectBox
            placeholder="select unit conversion"
            value={unit}
            onChange={(evt) => handleUnitConversionChange(evt)}
            items={units}
          />
          <Button
            handleOnclick={getWeatherStats}
            disabled={!(searchValue && unit) || isLoading}
          >
            Search
          </Button>
        </div>
        {isLoading ? (
          <h2>fetching data ......</h2>
        ) : (
          <div className="record-section">
            {isDataEmpty ? (
              <div className="no-record">
                <CloudSunRain />
              </div>
            ) : (
              <Suspense>
                <CurrentWeatherStats data={data} unit={unit} />
                <AirConditionStats data={data} unit={unit} />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
