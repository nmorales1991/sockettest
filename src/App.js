import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./views/Inicio";
import Chat from "./views/Chat";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
