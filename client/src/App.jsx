import React from "react"
import {Switch, Route} from "react-router-dom"


//Components

const Login = React.lazy(()=>import("./components/Login/Login"))
const Main = React.lazy(()=>import("./components/Main/Main"))

function App() {
  return (
      <Switch>
      <Route path="/" exact>
            <Login/>
      </Route>
      <Route path="/main">
        <Main/>
      </Route>
    </Switch>
  );
}

export default App;
