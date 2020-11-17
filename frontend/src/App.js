import Dashboard from "./components/pages/Dashboard";

import FiltersState from "./context/FiltersState";
import GraphState from "./context/graphState";

import hospitals_data from "./data/hospitals_data.json";
import tests_data from "./data/tests_data.json";

function App() {
  return (
    <div className="App">
      <FiltersState>
        <GraphState>
          <Dashboard
            hospitalsGlobalData={hospitals_data}
            testsGlobalData={tests_data}
          />
        </GraphState>
      </FiltersState>
    </div>
  );
}

export default App;
