import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./layouts/home";
import Edit from "./layouts/edit";
import Login from "./layouts/login";
import Header from "./components/ui/header";

function App() {
    console.log(process.env);
    return (
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/edit" component={Edit} />
            </Switch>
        </>
    );
}
export default App;
