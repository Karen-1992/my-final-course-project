import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Products from "./layouts/products";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import AppLoader from "./components/ui/hoc/appLoader";
import UserCabinet from "./layouts/userCabinet";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Dashboard from "./layouts/dashboard";
import "react-toastify/dist/ReactToastify.css";
import InitMockData from "./layouts/initMockData";
import CartPage from "./components/page/cartPage/cartPage";
import { useLoading } from "./hooks/useLoading";

function App() {
    const { handleMouseMove } = useLoading();
    return (
        <div className="container min-vh-100 position-relative" onMouseMove={(e) => handleMouseMove(e)}>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route
                        path="/initdata"
                        exact
                        component={InitMockData}
                    />
                    <Route
                        path="/products/:productId?"
                        exact
                        component={Products}
                    />
                    <Route path="/login/:type?" exact component={Login} />
                    <Route path="/logout" exact component={LogOut} />
                    <ProtectedRoute
                        path="/cabinet/:type?/:edit?"
                        component={UserCabinet}
                    />
                    <ProtectedRoute
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <ProtectedRoute path="/cart" component={CartPage} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
