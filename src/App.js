import React from "react";
import Contests from "./components/Contests";

import "./App.css";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <React.Fragment>
      <Container className="App" maxWidth="sm">
        <Contests />
      </Container>
    </React.Fragment>
  );
}

export default App;
