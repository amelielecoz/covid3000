import Dashboard from "./components/pages/Dashboard";

import FiltersState from "./context/FiltersState";

function App() {


  

  return (
    <div className="App">
      <FiltersState>
        <Dashboard />
      </FiltersState>
    </div>
  );
}

export default App;
