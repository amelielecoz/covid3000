import Dashboard from "./components/pages/Dashboard";

import FiltersState from "./context/FiltersState";

import hospitals_data from "./data/hospitals_data.json";

function App() {
  return (
    <div className="App">
      <FiltersState>
        <Dashboard hospitalsGlobalData={hospitals_data} />
      </FiltersState>
    </div>
  );
}

export default App;
