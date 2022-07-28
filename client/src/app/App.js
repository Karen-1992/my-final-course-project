import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Products from "./layouts/products";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Cart from "./layouts/cart";
import AppLoader from "./components/ui/hoc/appLoader";
import UserCabinet from "./layouts/userCabinet";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <div className="">
            <AppLoader>
                <NavBar />
                <Switch>
                    {/* <Route path="/products" exact
                        component={Products} /> */}
                    <Route path="/products/:product?" exact
                        component={Products} />
                    <Route path="/login/:type?" exact component={Login} />
                    <Route path="/logout" exact component={LogOut} />
                    <Route path="/cabinet/:edit?" exact component={UserCabinet} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
