import Dashboard from "./components/pages/Dashboard";

import FiltersState from "./context/FiltersState";

function App() {


  

  return (
    <div className="App">
      <header className="h-12">
        <img className="h-12" src="logoSimple.png" alt="covid logo" />
      </header>
      <FiltersState>
        <Dashboard />
      </FiltersState>
    </div>
  );
}

export default App;
