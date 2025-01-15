import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
//
import { units } from "./utils/constants";
import { useGetWeatherStats } from "./hooks/useGetWeatherStats";
import { CloudSunRain } from "./components/icons";
//
import {
  AirConditionStats,
  Button,
  CurrentWeatherStats,
  SearchBox,
  SelectBox,
} from "./components";
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
          <h1>fetching data ......</h1>
        ) : (
          <div className="record-section">
            {isDataEmpty ? (
              <div className="no-record">
                <CloudSunRain />
              </div>
            ) : (
              <>
                <CurrentWeatherStats data={data} unit={unit} />
                <AirConditionStats data={data} unit={unit} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
