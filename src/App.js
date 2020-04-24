import React from "react";
import WeatherPage from "./pages/weatherPage";
import CoronaPage from "./pages/CoronaPage/CoronaPage";
import "./App.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={WeatherPage} />
        <Route path="/corona" component={CoronaPage} />
      </Switch>
    </div>
  );
}

export default App;
